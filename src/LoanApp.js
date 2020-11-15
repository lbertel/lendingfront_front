import React, {useState} from 'react'
import {FormAddLoan} from "./components/FormAddLoan";

export const LoanApp = () => {

    const [loanStatus, setLoanStatus] = useState('');

    return (
        <>
            <h2>Loan App</h2>
            <hr/>
            <FormAddLoan setLoanStatus={ setLoanStatus } />
            Loan Status: {loanStatus}
        </>
    )
}