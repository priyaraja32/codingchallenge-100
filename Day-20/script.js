const menuToggle = document.getElementById('menuToggle');
const menuItems = document.getElementById('menuItems');
const pageContent = document.getElementById('pageContent');

// menu visibility//

menuToggle.addEventListener('click', () => {
  menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';//conditional operator are used
});

// Page card content//

const pages = {
  home: `
    <div class="card"><h2>Welcome</h2><p>This is the home page content. Latest updates are displayed here.</p></div>
    <div class="card"><h2>News</h2><p>Check out the latest news and announcements on our platform.</p></div>
    <div class="card"><h2>Highlights</h2><p>Important highlights and features of our website.</p></div>
  `,
  about: `
    <div class="card"><h2>Our Story</h2><p>We are a company dedicated to providing the best services for our customers.</p></div>
    <div class="card"><h2>Mission</h2><p>Our mission is to innovate and deliver high-quality solutions.</p></div>
    <div class="card"><h2>Vision</h2><p>We aim to be the leaders in our industry through dedication and creativity.</p></div>
  `,
  services: `
    <div class="card"><h2>Web Development</h2><p>We create fast, responsive, and modern websites.</p></div>
    <div class="card"><h2>Mobile Apps</h2><p>Custom mobile applications for Android and iOS platforms.</p></div>
    <div class="card"><h2>Marketing</h2><p>Digital marketing solutions to grow your business online.</p></div>
    <div class="card"><h2>UI/UX Design</h2><p>Designs focused on user experience and beautiful interfaces.</p></div>
  `,
  contact: `
    <div class="card"><h2>Email</h2><p>example123@gmail.com</p></div>
    <div class="card"><h2>Phone</h2><p>91+9876543210</p></div>
    <div class="card"><h2>Address</h2><p>123 North Street,Perambalur</p></div>
  `
};

// here Update content when menu  is clicked

const menuLinks = menuItems.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    const page = link.getAttribute('data-page');
    pageContent.innerHTML = pages[page];
    pageContent.className = page + ' card-container';
    menuItems.style.display = 'none'; //after selection menu will close
  });
});




