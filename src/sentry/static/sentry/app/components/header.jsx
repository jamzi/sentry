/*** @jsx React.DOM */

var React = require("react");

var AppState = require("../mixins/appState");
var Breadcrumbs = require("./breadcrumbs");
var ConfigStore = require("../stores/configStore");
var DropdownLink = require("./dropdownLink");
var Gravatar = require("./gravatar");
var MenuItem = require("./menuItem");
var OrganizationState = require("../mixins/organizationState");
var UserInfo = require("./userInfo");

var UserNav = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render() {
    var urlPrefix = ConfigStore.get('urlPrefix');
    var user = ConfigStore.get('user');

    if (!user) {
      // TODO
      return <div />;
    }

    var title = (
      <span>
        <Gravatar email={user.email} className="avatar" />
        <UserInfo user={user} className="user-name" />
      </span>
    );

    return (
      <DropdownLink
          topLevelClasses={this.props.className}
          menuClasses="dropdown-menu-right"
          title={title}>
        <MenuItem href={urlPrefix + '/account/settings/'}>Account</MenuItem>
        <MenuItem href={urlPrefix + '/auth/logout/'}>Sign out</MenuItem>
      </DropdownLink>
    );
  }
});

var OrganizationSelector = React.createClass({
  mixins: [
    AppState,
    OrganizationState
  ],

  render() {
    var activeOrg = this.getOrganization();
    var urlPrefix = ConfigStore.get('urlPrefix');
    var features = ConfigStore.get('features');

    if (!activeOrg) {
      // TODO
      return <div />;
    }

    return (
      <DropdownLink
          title={activeOrg.name}>
        {this.getOrganizationList().map((org) => {
          var iconStyle = {
            backgroundImage: 'url(https://github.com/getsentry.png)' //TODO(dcramer) use actual org avatar
          };
          return (
            <MenuItem key={org.slug} to="organizationDetails" params={{orgId: org.slug}} iconUrl="http://github.com/getsentry.png">
              <span className="org-avatar" style={iconStyle} />
              {org.name}
            </MenuItem>
          );
        })}
        {features.has('organizations:create') &&
          <div>
            <div className="divider"></div>
            <MenuItem href={urlPrefix + '/organizations/new/'}>New Organization</MenuItem>
          </div>
        }
      </DropdownLink>
    );
  }
});


var Header = React.createClass({
  render() {
    return (
      <header>
        <div className="container">
          <UserNav className="pull-right" />
          <a href="/"><span className="icon-sentry-logo"></span></a>
          <OrganizationSelector />
        </div>
      </header>
    );
  }
});

module.exports = Header;
