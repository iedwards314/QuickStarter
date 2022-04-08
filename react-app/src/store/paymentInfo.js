
export const saveInfo = async (paymentInfo)  => {
    const response = await fetch('/api/payments/addInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
    });
    if (response.ok) {
        // const info = response.json();
        // dispatch
        return "Success!"
    }
}
