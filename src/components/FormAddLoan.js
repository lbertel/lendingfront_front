import React, {useRef, useState} from 'react';

export const FormAddLoan = ({ setLoanStatus }) => {

    const sendButton = useRef();

    const [formState, setFormState] = useState({
        tax_id: '',
        business_name: '',
        request_amount: 2500,
        ssn: '',
        owner_name: '',
        email: ''
    });

    const {
        tax_id,
        business_name,
        request_amount,
        ssn,
        owner_name,
        email
    } = formState;

    const handleInputChange = ({ target }) => {

        setFormState({
            ...formState,
            [ target.name ]: target.value
        });

    }

    const disableButton = () =>{
        sendButton.current.disabled = true;
    }

    const enabledButton = () =>{
        sendButton.current.disabled = false;
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        disableButton()

        fetch("http://localhost:3001/api/loan/create/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(formState), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => setLoanStatus(response.loan_decision));

        enabledButton()
    }

    return (
        <form onSubmit={ handleSubmit }>
            <fieldset>
                <legend>Add Loan</legend>
                <label htmlFor="tax_id">Tax Id</label><br/>
                <input
                    type="text"
                    name="tax_id"
                    value={ tax_id }
                    onChange={ handleInputChange }
                /><br/>
                <label htmlFor="business_name">Business Name</label><br/>
                <input
                    type="text"
                    name="business_name"
                    value={ business_name }
                    onChange={ handleInputChange }
                /><br/>
                <label htmlFor="request_amount">Request Amount *</label><br/>
                <input
                    min="1"
                    type="number"
                    name="request_amount"
                    required
                    value={ request_amount }
                    onChange={ handleInputChange }
                /><br/>
                <fieldset>
                    <legend>Owner</legend>
                    <label htmlFor="ssn">SSN *</label><br/>
                    <input
                        required
                        placeholder="123-45-6789"
                        type="text"
                        pattern="\d{3}-?\d{2}-?\d{4}"
                        name="ssn"
                        value={ ssn }
                        onChange={ handleInputChange }
                    /><br/>
                    <label htmlFor="owner_name">Owner Name *</label><br/>
                    <input
                        type="text"
                        required
                        name="owner_name"
                        value={ owner_name }
                        onChange={ handleInputChange }
                    /><br/>
                    <label htmlFor="email">Owner email *</label><br/>
                    <input
                        type="email"
                        name="email"
                        required
                        value={ email }
                        onChange={ handleInputChange }
                    />
                </fieldset>
                <button ref={sendButton}>Send</button>
            </fieldset>
        </form>
    )
}