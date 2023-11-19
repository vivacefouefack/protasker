import React, { useState, useEffect } from 'react'
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import './style.css'


const EditTask = ({ modal, toggle, save, formData,users,state }) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [id, setId] = useState('');
    const [label, setLabel] = useState('');
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "label") {
            setLabel(value);
        } else if (name === "userId") {
            setUserId(value);
        } else if (name === "status") {
            setStatus(value);
        }
    }


    const handleSave = () => {
        if (!label.length || !status) {
            setErrorMsg('le champ libellé et statut sont obligatoire')
        }else if (formData.label===label && formData.status===status && formData.userId===userId) {
            setErrorMsg('Attention aucun champ modifié')
        } else {
            save({id,label, userId, status });
            setErrorMsg('')
            setLabel('');
            setUserId('');
            setStatus('');
        }
    }

    useEffect(() => {
        setId(formData.id)
        setLabel(formData.label)
        setUserId(formData.userId)
        setStatus(formData.status)
    }, [formData.id,formData.label, formData.status, formData.userId])

    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader className="orange" toggle={toggle}>Modification d'une tâche</ModalHeader>
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
                            value={label}
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
                            value={userId}
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
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
                                value={status}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {
                                    state.map(stat => (
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
                    Modifier
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditTask
