# SignBridge

Premium frontend prototype for real-time sign language communication. This project intentionally uses simulated recognition and local UI state only; it does not include WebRTC, a recognition model, authentication, or backend services.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `src/App.tsx` — landing page, workspace shell, reusable control, recognition, chat, history, and confirmation dialog components.
- `src/styles.css` — responsive dark visual system and layout styles.
- `src/main.tsx` — React entrypoint.

## Integration points

- Replace the sample `messages` array and submit handler with a real messaging/WebSocket service.
- Connect `RecognitionPanel` to the sign-language model service and replace its demo predictions.
- Replace the video panels with WebRTC media tracks and connection state.
- Keep camera/microphone/caption controls wired to the corresponding media/session service.
