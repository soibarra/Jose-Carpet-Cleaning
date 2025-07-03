document.addEventListener('DOMContentLoaded', () => {
  let signupBtn = document.getElementById('signupBtn');
  let signinBtn = document.getElementById('signinBtn');
  let nameField = document.getElementById('nameField');
  let title = document.getElementById('title');
  let emailInput = document.getElementById('emailInput');
  let passwordInput = document.getElementById('passwordInput');
  let nameInput = document.getElementById('nameInput');
  let errorMsg = document.getElementById('errorMsg');
  let actionBtn = document.getElementById('actionBtn');
  let form = document.getElementById('authForm');

  // Email validation regex for @gmail.com, @hotmail.com, @yahoo.com
  const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;

  // Toggle to Sign-In mode
  signinBtn.onclick = function() {
      nameField.style.maxHeight = '0';
      title.innerHTML = 'Sign In';
      actionBtn.innerHTML = "Let's go!";
      signupBtn.classList.add('disable');
      signinBtn.classList.remove('disable');
      clearErrors();
      updateActionButton();
  };

  // Toggle to Sign-Up mode
  signupBtn.onclick = function() {
      nameField.style.maxHeight = '60px';
      title.innerHTML = 'Sign Up';
      actionBtn.innerHTML = 'Create account';
      signupBtn.classList.remove('disable');
      signinBtn.classList.add('disable');
      clearErrors();
      updateActionButton();
  };

  // Update action button state based on input validity
  function updateActionButton() {
      if (title.innerHTML === 'Sign Up') {
          let name = nameInput.value.trim();
          let email = emailInput.value.trim();
          let password = passwordInput.value.trim();
          if (name && email && password && emailRegex.test(email)) {
              actionBtn.classList.remove('disable');
          } else {
              actionBtn.classList.add('disable');
          }
      } else {
          let email = emailInput.value.trim();
          let password = passwordInput.value.trim();
          if (email && password) {
              actionBtn.classList.remove('disable');
          } else {
              actionBtn.classList.add('disable');
          }
      }
  }

  // Listen for input changes to update action button
  nameInput.addEventListener('input', updateActionButton);
  emailInput.addEventListener('input', updateActionButton);
  passwordInput.addEventListener('input', updateActionButton);

  // Handle action button click
  actionBtn.onclick = function() {
      if (!actionBtn.classList.contains('disable')) {
          if (title.innerHTML === 'Sign Up') {
              handleSignup();
          } else {
              handleSignin();
          }
      }
  };

  // Prevent default form submission
  form.onsubmit = function(e) {
      e.preventDefault();
  };

  // Sign-Up logic
  function handleSignup() {
      let name = nameInput.value.trim();
      let email = emailInput.value.trim();
      let password = passwordInput.value.trim();

      if (!name || !email || !password) {
          showError('All fields are required');
          return;
      }

      if (!emailRegex.test(email)) {
          showError('Email must end with @gmail.com, @hotmail.com, or @yahoo.com');
          emailInput.parentElement.classList.add('error');
          return;
      }

      // Save user data to localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === email)) {
          showError('Email already exists');
          emailInput.parentElement.classList.add('error');
          return;
      }

      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! Please sign in.');
      signinBtn.click(); // Switch to sign-in mode
  }

  // Sign-In logic
  function handleSignin() {
      let email = emailInput.value.trim();
      let password = passwordInput.value.trim();

      if (!email || !password) {
          showError('Email and password are required');
          return;
      }

      let users = JSON.parse(localStorage.getItem('users')) || [];
      let user = users.find(user => user.email === email && user.password === password);

      if (user) {
          // Successful sign-in, redirect to dashboard
          window.location.href = 'dashboard.html';
      } else {
          showError('Incorrect email or password');
          emailInput.parentElement.classList.add('error');
          passwordInput.parentElement.classList.add('error');
      }
  }

  // Show error message and style inputs
  function showError(message) {
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = message;
  }

  // Clear error states
  function clearErrors() {
      errorMsg.style.display = 'none';
      emailInput.parentElement.classList.remove('error');
      passwordInput.parentElement.classList.remove('error');
      nameInput.parentElement.classList.remove('error');
  }

  // Initialize button state
  updateActionButton();
});