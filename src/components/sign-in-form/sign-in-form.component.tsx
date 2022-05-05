import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import { AuthErrorCodes, AuthError } from 'firebase/auth';

const userDefaults = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(userDefaults);
    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(userDefaults);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    // Email and Password Sign In Function
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) return;

        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    break;
                case AuthErrorCodes.USER_DELETED:
                    break;
                default:
                    console.log(error);
            }
        }
    };

    // Google Auth Redirect Sign In
    useEffect(() => {
        (async () =>
            dispatch(googleSignInStart())
        )();
    }, [dispatch]);

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password, or with Google</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button>Sign In</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogleRedirect}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;