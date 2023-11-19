import React from 'react'
import { Button, Modal,ModalBody } from 'reactstrap'
import './style.css'


const DeleteTask = ({ modal, toggle, id,deleteTask}) => {
    
    const handleDelete = () => {
        deleteTask(id)
    }

    return (
        <Modal isOpen={modal} toggle={toggle} >
            <br />
            <ModalBody className="delete">
                <h4 className="orange">Suppression d'une tâche</h4>
                <p>Vous êtes sur le point de supprimer une tâche.</p>
                <p>Êtes-vous sûr de vouloir procéder à la suppression ?</p><br />
                <Button color="secondary" onClick={toggle}>
                    Annuler
                </Button>{' '}
                <Button color="danger" onClick={handleDelete}>
                    Supprimer
                </Button>
            </ModalBody>

        </Modal>
    )
}
export default DeleteTask
