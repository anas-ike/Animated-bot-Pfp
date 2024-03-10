const fs = require('fs');
const token = process.env.TOKEN;

async function updateAvatar() {
    try {
        const newAvatar = fs.readFileSync('av.gif'); // Path to the new avatar image file
        const response = await fetch('https://discord.com/api/v9/users/@me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `data:image/gif;base64,${newAvatar.toString('base64')}`
            })
        });

        if (response.ok) {
            console.log('Avatar updated successfully!');
        } else {
            console.error('Failed to update avatar:', response.statusText);
            const responseBody = await response.text();
            console.error('Response body:', responseBody);
        }
    } catch (error) {
        console.error('Error updating avatar:', error);
    }
}

updateAvatar(); 
