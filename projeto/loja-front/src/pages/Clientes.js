import { useEffect, useState } from 'react';
import api from '../services/api';
import './Clientes.css';

function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [editandoCodigo, setEditandoCodigo] = useState(null);

    useEffect(() => {
        listarClientes();
    }, []);

    function getHeaders() {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    async function listarClientes() {
        const response = await api.get('/cliente', getHeaders());
        setClientes(response.data);
    }

    async function salvarCliente() {
        if (editandoCodigo) {
            await api.put(
                `/cliente/${editandoCodigo}`,
                { nome, email, telefone },
                getHeaders()
            );
            setEditandoCodigo(null);
        } else {
            await api.post('/cliente', { nome, email, telefone }, getHeaders());
        }

        setNome('');
        setEmail('');
        setTelefone('');
        listarClientes();
    }

    function editarCliente(cliente) {
        setEditandoCodigo(cliente.codigo);
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
    }

    async function excluirCliente(codigo) {
        await api.delete(`/cliente/${codigo}`, getHeaders());
        listarClientes();
    }

    function sair() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Clientes</h1>
                <button className="btn-sair" onClick={sair}>Sair</button>
            </div>

            <div className="formulario">
                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <button onClick={salvarCliente}>
                    {editandoCodigo ? 'Atualizar' : 'Salvar'}
                </button>
                {editandoCodigo && (
                    <button className="btn-cancelar" onClick={() => {
                        setEditandoCodigo(null);
                        setNome('');
                        setEmail('');
                        setTelefone('');
                    }}>Cancelar</button>
                )}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.codigo}>
                            <td>{cliente.codigo}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button className="btn-editar" onClick={() => editarCliente(cliente)}>Editar</button>
                                <button className="btn-excluir" onClick={() => excluirCliente(cliente.codigo)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clientes;
