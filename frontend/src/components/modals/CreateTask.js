import React, { useState } from 'react'
import { Button,Alert, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import './style.css'

const CreateTask = ({ modal, toggle, save,users,status }) => {

    const [errorMsg, setErrorMsg] = useState('')

    const [formData, setFormData] = useState({
        userId: '',
        label: '',
        status: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,[name]: value,
        });
    }


    const handleSave = () => {
        if(!formData.label || !formData.status){
            setErrorMsg('le champ libellé et statut sont obligatoire')
        }else{
            save(formData);
            setErrorMsg('') 
        } 
        setFormData({
            userId: '',
            label: '',
            status: '',
        })
        
    }

    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader className="orange" toggle={toggle}>Nouvelle tâche</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="label">
                            Libellé de la tâche
                        </Label>
                        <Input
                            id="label"
                            name="label"
                            type="text"
                            value={formData.label}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="attribution">
                            Attribution
                        </Label>
                        <Input
                            id="userId"
                            name="userId"
                            type="select"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        >
                            <option></option>
                            {
                                users.map(user => (
                                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                ))
                            }

                        </Input>

                        <FormGroup>
                            <Label for="status">
                                Statut
                            </Label>
                            <Input
                                id="status"
                                name="status"
                                type="select"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {
                                    status.map(stat => (
                                        <option key={stat.id} value={stat.id}>{stat.name}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                    </FormGroup>
                </Form>
                {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>
                    Annuler
                </Button>{' '}
                <Button color="secondary" onClick={handleSave}>
                    Ajouter
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateTask
