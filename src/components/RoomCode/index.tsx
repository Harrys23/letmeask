import { toast } from "react-toastify";

import copyImg from "../../assets/copy.svg";

import "./style.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    toast.dark("Código copiado com sucesso 👍", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <span>Sala #{props.code}</span>

      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
    </button>
  );
}
