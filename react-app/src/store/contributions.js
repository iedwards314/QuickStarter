

export const postContribution = async (contribution) => {
    const response = await fetch('/api/contributions/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contribution),
    });
    if (response.ok) {
        // const res = await response.json();
        return contribution;
    };
}
