export const saveLoan = async (payload) => {

    const url = 'http://localhost:3001/api/loan/create/';
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {loan_decision} = await resp.json();

    return loan_decision;
}