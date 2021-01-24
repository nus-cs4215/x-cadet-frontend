import moment from 'moment';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import Contributors from '../../pages/contributors/Contributors';
import Disabled from '../../pages/disabled/Disabled';
import Login from '../../pages/login/LoginContainer';
import NotFound from '../../pages/notFound/NotFound';
import Playground from '../../pages/playground/PlaygroundContainer';
import SourcecastContainer from '../../pages/sourcecast/SourcecastContainer';
import NavigationBar from '../navigationBar/NavigationBar';
import Constants from '../utils/Constants';
import { parseQuery } from '../utils/QueryHelper';
import { Role } from './ApplicationTypes';

export type ApplicationProps = DispatchProps & StateProps & RouteComponentProps<{}>;

export type DispatchProps = {
  handleLogOut: () => void;
};

export type StateProps = {
  role?: Role;
  title: string;
  name?: string;
};

interface ApplicationState {
  disabled: string | boolean;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {
  private intervalId: number | undefined;

  public constructor(props: ApplicationProps) {
    super(props);
    this.state = { disabled: computeDisabledState() };
  }

  public componentDidMount() {
    if (Constants.disablePeriods.length > 0) {
      this.intervalId = window.setInterval(() => {
        const disabled = computeDisabledState();
        if (this.state.disabled !== disabled) {
          this.setState({ disabled });
        }
      }, 5000);
    }
  }

  public componentWillUnmount() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  public render() {
    const loginPath = <Route path="/login" render={toLogin(this.props)} key="login" />;
    const fullPaths = Constants.playgroundOnly ? null : [loginPath];
    const disabled = !['staff', 'admin'].includes(this.props.role!) && this.state.disabled;

    return (
      <div className="Application">
        <NavigationBar
          handleLogOut={this.props.handleLogOut}
          role={this.props.role}
          name={this.props.name}
          title={this.props.title}
        />
        <div className="Application__main">
          {disabled && (
            <Switch>
              {!Constants.playgroundOnly && loginPath}
              {/* if not logged in, and we're not a playground-only deploy, then redirect to login (for staff) */}
              {!this.props.role && !Constants.playgroundOnly
                ? [
                    <Route path="/academy" render={redirectToLogin} key={0} />,
                    <Route exact={true} path="/" render={redirectToLogin} key={1} />
                  ]
                : []}
              <Route render={this.renderDisabled.bind(this)} />
            </Switch>
          )}
          {!disabled && (
            <Switch>
              <Route path="/playground" component={Playground} />
              <Route path="/contributors" component={Contributors} />
              <Route path="/sourcecast/:sourcecastId?" component={SourcecastContainer} />
              {fullPaths}
              <Route
                exact={true}
                path="/"
                render={Constants.playgroundOnly ? redirectToPlayground : redirectToAcademy}
              />
              <Route component={NotFound} />
            </Switch>
          )}
        </div>
      </div>
    );
  }

  private renderDisabled = () => (
    <Disabled reason={typeof this.state.disabled === 'string' ? this.state.disabled : undefined} />
  );
}

const redirectToPlayground = () => <Redirect to="/playground" />;
const redirectToAcademy = () => <Redirect to="/academy" />;
const redirectToLogin = () => <Redirect to="/login" />;

const toLogin = (props: ApplicationProps) => () => {
  const qstr = parseQuery(props.location.search);

  return (
    <Login
      code={qstr.code}
      providerId={qstr.provider}
      providers={[...Constants.authProviders.entries()].map(([id, { name }]) => ({
        id,
        name
      }))}
    />
  );
};

function computeDisabledState() {
  const now = moment();
  for (const { start, end, reason } of Constants.disablePeriods) {
    if (start.isBefore(now) && end.isAfter(now)) {
      return reason || true;
    }
  }
  return false;
}

export default Application;
