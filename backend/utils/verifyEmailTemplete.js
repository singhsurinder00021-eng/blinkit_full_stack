const verifyEmailTemplate = ({name, url}) => {
  return `
    <p>Dear ${name}</p>

    <p>Thank you for registering Blinkit.</p>

    <a href="${url}" 
       style="color:white; background:blue; padding:10px 15px; display:inline-block; margin-top:10px; text-decoration:none;">
       Verify Email
    </a>
  `;
};

export default verifyEmailTemplate;