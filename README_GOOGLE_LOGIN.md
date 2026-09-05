# Google Login Setup

CareerPath AI now uses Firebase Authentication for **real Google sign-in**. The Google account chooser is forced with `prompt: select_account`, so the user can choose which Google account to use each time.

## 1. Configure the Firebase Web app

In Firebase Console, open the `careerpathai-e9e5c` project and add/register a Web app if one does not already exist. Copy its Web SDK configuration into `frontend/.env` using `frontend/.env.example`.

Do **not** use the Firebase Admin service-account JSON in the frontend.

## 2. Enable Google provider

Firebase Console -> Authentication -> Sign-in method -> Google -> Enable.

## 3. Authorized domains

Firebase Console -> Authentication -> Settings -> Authorized domains.

For local development, make sure `localhost` is present. Add your deployed Vercel domain as well when deploying.

## 4. Install and run

From the project root:

```powershell
npm install
npm run install:all
npm run dev
```

Then open `http://localhost:5173/login` and click **Continue with Google**.

The Google account chooser should appear. Select an account and CareerPath AI will create/load that account's profile using the selected Google email.

## Security

Never commit Firebase Admin service-account JSON files or private keys. Rotate any Admin SDK private key that was previously exposed.
