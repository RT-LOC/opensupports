import React              from 'react';
import { connect }        from 'react-redux'

import i18n               from 'lib-app/i18n';
import SessionActions     from 'actions/session-actions';
import ConfigActions      from 'actions/config-actions';

import Button             from 'core-components/button';
import DropDown           from 'core-components/drop-down';

let codeLanguages = {
    'English': 'us',
    'Spanish': 'es',
    'German': 'de',
    'French': 'fr',
    'Chinese': 'cn',
    'Turkish': 'tr',
    'Indian': 'in'
};

class MainLayoutHeader extends React.Component {

    render() {
        return (
            <div className="main-layout-header">
                {this.renderAccessLinks()}
                <DropDown {...this.getLanguageSelectorProps()}/>
            </div>
        );
    }
    
    renderAccessLinks() {
        let result;
        
        if (this.props.session.logged) {
            result = (
                <div className="main-layout-header__login-links">
                    {i18n('WELCOME')}, 
                    <span className="main-layout-header__user-name"> {this.props.session.userName}</span>
                </div>
            );
        } else {
            result = (
                <div className="main-layout-header__login-links">
                    <Button type="clean" route={{to:'/'}}>{i18n('LOG_IN')}</Button>
                    <Button type="clean" route={{to:'/signup'}}>Sign up</Button>
                </div>
            );
        }

        return result;
    }

    getLanguageSelectorProps() {
        return {
            className: 'main-layout-header__languages',
            items: this.getLanguageList(),
            selectedIndex: Object.values(codeLanguages).indexOf(this.props.config.language),
            onChange: this.changeLanguage.bind(this)
        };
    }

    getLanguageList() {
        return Object.keys(codeLanguages).map((language) => {
            return {
                content: language,
                icon: codeLanguages[language]
            };
        });
    }

    changeLanguage(event) {
        let language = Object.keys(codeLanguages)[event.index];

        this.props.dispatch(ConfigActions.changeLanguage(codeLanguages[language]));
    }
}

export default connect((store) => {
    return {
        session: store.session,
        config: store.config
    };
})(MainLayoutHeader);
