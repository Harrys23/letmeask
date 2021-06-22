import { useHistory } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  return (
    <div id="auth-page">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas ded Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form action="">
            <input type="text" placeholder="Digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
