// js/forget.js
let sentCode = "";

function sendNewPassword(){
    document.getElementById('newPasswordSent').style.display = 'flex';
}

function closeNewPasswordSent(){
    document.getElementById('newPasswordSent').style.display = 'none';
    window.location.href = 'index.html';
}

async function sendCode() {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Please enter your email");
        return;
    }
    // const endcodedEmail = encodeURIComponent(email);
    const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Auth/forgot-password';
    try{
        const response = await fetch(`${api}?email=${email}`, {method: "POST"});
        sendNewPassword();
    } catch(err){console.log(err);}
    // محاكاة إرسال كود (في الحقيقي لازم تبعته من السيرفر)
    sentCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Code sent to email:", sentCode); // في الواقع، السيرفر هيرسل الإيميل


    // alert("Verification code sent to your email!");

    // الانتقال للخطوة 2
    // document.getElementById("step1").style.display = "none";
    // document.getElementById("step2").style.display = "block";
}

function verifyCode() {
    const inputCode = document.getElementById("verificationCode").value;
    if (inputCode === sentCode) {
        alert("Code verified!");

        // الانتقال للخطوة 3
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
    } else {
        alert("Invalid code. Please try again or resend.");
    }
}

function resetPassword() {
    const pass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    // هنا المفروض يتم الإرسال للسيرفر لتحديث الباسورد
    alert("Password reset successfully! You can now login.");
    window.location.href = "login.html";
}
