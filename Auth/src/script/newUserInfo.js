function myAlert(icon, title) {
  Swal.fire({
    toast: true,
    position: 'top',
    icon,
    title,
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: { popup: 'custom-toast' },
    willOpen: () => {
      const style = document.createElement('style');
      style.innerHTML = `
        .custom-toast {
          font-family: 'Arial', sans-serif;
          font-size: 12px;
          background-color: rgb(255, 255, 255);
          color: #262626;
        }
      `;
      document.head.appendChild(style);
    },
  });
}
function resizeAndConvert(file, callback) {
  if (!(file instanceof Blob)) {
    myAlert('error', 'Invalid file selected.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 200;  
      canvas.height = 200;  
      ctx.drawImage(img, 0, 0, 200, 200);  
      callback(canvas.toDataURL());  
    };
    img.onerror = function () {
      myAlert('error', 'Error loading image. Please try a different file.');
    };
  };
  reader.onerror = function () {
    myAlert('error', 'Error reading file. Please try again.');
  };
  reader.readAsDataURL(file);
}


document.getElementById('fileInput').onchange = function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    myAlert(
      'error',
      'Invalid file selected. Please choose a JPEG, PNG, or WebP image.'
    );
    return;
  }

  const objectURL = URL.createObjectURL(file);
  document.getElementById('profileImage').src = objectURL;
};


window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const platform = urlParams.get('platform');
  const email = urlParams.get('email');
  let fullname = urlParams.get('fullname') || '';

  if (fullname) document.getElementById('fullName').value = fullname;
  if (email) {
    const emailField = document.getElementById('email');
    emailField.value = email;
    emailField.readOnly = true;
  }
  if (platform) {
    const platformField = document.getElementById('platform');
    platformField.value = platform;
    platformField.readOnly = true;
  }

  document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.getElementById('submit-button').click();
        event.preventDefault();
      }
    });
  });

  function validateInput(
    fullName,
    userName,
    password,
    confirmPassword,
    profileUrl
  ) {
    if (fullName.length < 3)
      return myAlert('error', 'Full name must be at least 3 characters long.');
    if (fullName.length > 50)
      return myAlert('error', 'Full name cannot exceed 50 characters.');
    if (!profileUrl) return myAlert('error', 'Choose a Profile');
    if (userName.length < 7)
      return myAlert('error', 'Username must be at least 7 characters long.');
    if (userName.length > 50)
      return myAlert('error', 'Username cannot exceed 50 characters.');
    if (password.length < 7)
      return myAlert('error', 'Password must be at least 7 characters long.');
    if (password.length > 50)
      return myAlert('error', 'Password cannot exceed 50 characters.');
    if (!/[A-Z]/.test(password))
      return myAlert(
        'error',
        'Password must include at least one uppercase letter.'
      );
    if (!/[0-9]/.test(password))
      return myAlert('error', 'Password must include at least one number.');
    if (password !== confirmPassword)
      return myAlert('error', 'Passwords do not match. Please try again.');
    return true;
  }

  document.getElementById('submit-button').onclick = async function (event) {
    event.preventDefault();
    myAlert('info', 'Validating');
    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0)
      return myAlert('error', 'Choose a Profile');
    resizeAndConvert(fileInput.files[0], async function (profileUrlBase64) {
      document.getElementById('profileImage').src = profileUrlBase64;
      if (
        validateInput(
          fullName,
          userName,
          password,
          confirmPassword,
          profileUrlBase64
        )
      ) {
        try {
          const response = await axios.post(
            'https://ping-server-2.onrender.com/auth/signupSuccessful',
            {
              fullName,
              userName,
              password,
              email,
              platform: 'Blog',
              profileUrl: profileUrlBase64,
            },
            {
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' },
            }
          );
          myAlert('success', response.data.message);
          window.location.href = 'https://ping-server-2.onrender.com/auth/home';
        } catch (error) {
          myAlert(
            'error',
            error.response?.data?.message || 'An error occurred'
          );
        }
      }
    });
  };
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.btnClick').click();
  }
});
