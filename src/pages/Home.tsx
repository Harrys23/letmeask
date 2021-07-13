import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../hooks/useAuth";
import { database } from "../service/firebase";
import { Button } from "../components/Button";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.dark("Sala digitada não existe, confira o código 😅", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.dark("A sala já foi fechada ✌️", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="auth-page">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
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

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
