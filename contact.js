//template_6nd3ba8
//service_901l9s9
//hnwgVKN__Tebwn9JO
emailjs.init('hnwgVKN__Tebwn9JO');

export function SendEmail(name, email, message){
    const templateParams = {
        name: name,
        email: email,
        message: message
    }

    return emailjs.send(
        'service_901l9s9',
        'template_6nd3ba8',
        templateParams
    ).then((response) =>{
        console.log('email sent', response.status, response.text);
        return {success:true};
    }).catch((err)=>{
        console.error('error sending email', err);
        return {sucess:false, error:err};
    });
}