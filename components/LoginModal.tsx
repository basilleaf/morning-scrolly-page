"use client";

import { PEACH, PEACH_SOFT, FONT_DISPLAY, FONT_BODY } from "../app/_lib/theme";

type Props = {
  loginEmail: string;
  setLoginEmail: (v: string) => void;
  loginPassword: string;
  setLoginPassword: (v: string) => void;
  loginError: string;
  loginLoading: boolean;
  handleLogin: (e: React.FormEvent) => void;
  onClose: () => void;
};

export default function LoginModal({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  loginLoading,
  handleLogin,
  onClose,
}: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 20,
          padding: "28px 28px 24px",
          width: 300,
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#2D2D2D",
            marginBottom: 16,
            fontFamily: FONT_DISPLAY,
          }}
        >
          Sign in
        </div>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            autoFocus
            required
            style={{
              border: `1.5px solid ${PEACH_SOFT}`,
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: 15,
              outline: "none",
              fontFamily: FONT_BODY,
              color: "#2D2D2D",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            style={{
              border: `1.5px solid ${PEACH_SOFT}`,
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: 15,
              outline: "none",
              fontFamily: FONT_BODY,
              color: "#2D2D2D",
            }}
          />
          {loginError && (
            <p style={{ fontSize: 15, color: "#E24B4A", margin: 0 }}>
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            style={{
              background: PEACH,
              border: "none",
              borderRadius: 10,
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              padding: "10px",
              cursor: "pointer",
              fontFamily: FONT_BODY,
              opacity: loginLoading ? 0.6 : 1,
            }}
          >
            {loginLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
