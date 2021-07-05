import { Link, useHistory } from 'react-router-dom'; // para importar a função link
import { FormEvent } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.css';
import { Button } from '../components/Button';
import { useState } from 'react';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';



export function NewRoom(){
const {user} = useAuth();

const history = useHistory();

const [newRoom, setNewRoom] = useState('');


async function handleCreateRoom(event: FormEvent){
    event.preventDefault();
    

    if(newRoom.trim() === ''){ //trim remove espaços
        return;
    }

    const roomRef = db.ref('rooms');

    const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id 
    });

    history.push(`/rooms/${firebaseRoom.key}`) // é crase mesmo
}

    return(
    <div id="page-auth">
        <aside>
            <img src={illustrationImg} alt="Logo" />
            <strong>Crie salas de Q&amp;A ao vivo.</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="LetMeAsk" />
                <h2>Criar uma nova sala</h2>
                <form onSubmit={handleCreateRoom} >
                    <input
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)} //
                        value={newRoom}
                />
                    <Button type="submit">Criar sala</Button>
                </form>
                <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
            </div>
        </main>
    </div>

);
}