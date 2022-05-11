import { Container, Modal, Button } from 'react-bootstrap'
import CoastersList from '../../components/CoastersList/CoastersList'
import { useContext, useEffect, useState } from "react"
import NewCoasterForm from './../../components/NewCoasterForm/NewCoasterForm'
import coastersService from './../../services/coaster.service'
import { AuthContext } from './../../context/auth.context'
import { MessageContext } from './../../context/message.context'

const CoastersPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [coasters, setCoasters] = useState([])

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    useEffect(() => loadCoasters(), [])

    const loadCoasters = () => {
        coastersService
            .getAllCoasters()
            .then(({ data }) => setCoasters(data))
            .then(err => console.log(err))
    }

    const { isLoggedIn } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)


    const fireFinalActions = () => {
        closeModal()
        loadCoasters()
        showMessage('Completado', 'Montaña rusa creada en la BBDD')
    }


    return (
        <>
            <Container>
                <h1>Listado de montañas rusas</h1>
                {isLoggedIn && <Button onClick={openModal}>Crear nueva</Button>}
                <hr />
                <CoastersList coasters={coasters} />
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva montaña rusa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCoasterForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CoastersPage