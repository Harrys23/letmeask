import { useHistory, useParams } from "react-router-dom";
import { database } from "../../service/firebase";
import { Button } from "../Button/index";

import "./style.scss";

type modalProps = {
  closeModal: () => void;
};

type RoomParams = {
  id: string;
};

export default function Modal(props: modalProps) {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <h1>Deseja realmente encerrar a sala?</h1>

        <div className="footer">
          <Button isOutlined onClick={() => props.closeModal()}>
            Cancelar
          </Button>
          <Button onClick={() => handleEndRoom()}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
}
