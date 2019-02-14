import app, { Component, on } from 'apprun';
import { auth, serializeObject } from '../api'
import Errors from './error-list';

class ContactComponent extends Component {
    state = {}

    view = (state) => {

        if (!state || state instanceof Promise) return;

        return <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Contact</h1>

                        {state.errors && <Errors errors={state.errors} />}

                        <form onsubmit={e => this.run('contact', e)}>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Subject" name="subject" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="email" placeholder="Email" name="email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea className="form-control form-control-lg" type="textarea" placeholder="Comment" name="comment" />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Send!
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    }

    @on('#/contact') register = (state, messages) => ({ ...state, messages })

    @on('contact') submitRegistration = async (state, e) => {
        try {
            e.preventDefault();
            const session = await auth.register(serializeObject(e.target));
            app.run('#user', session.user);
            app.run('route', '#/');
        } catch ({ errors }) {
            return { ...state, errors }
        }
    }
}

export default new ContactComponent().mount('my-app')