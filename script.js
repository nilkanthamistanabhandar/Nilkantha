// Sweets Data
const sweetsData = [
  {
    id: 1,
    name: 'Rasgulla',
    category: 'milk-based',
    description: 'Soft and juicy Bengali rasgulla',
    price: '₹300/kg',
    emoji: '🍡'
  },
  {
    id: 2,
    name: 'Sandesh',
    category: 'milk-based',
    description: 'Fresh and delicate sandesh made daily',
    price: '₹400/kg',
    emoji: '🧁'
  },
  {
    id: 3,
    name: 'Cham Cham',
    category: 'milk-based',
    description: 'Sweet and delicious cham cham',
    price: '₹350/kg',
    emoji: '🍬'
  },
  {
    id: 4,
    name: 'Rosomalai',
    category: 'milk-based',
    description: 'Succulent rosogolla in thick milk',
    price: '₹350/kg',
    emoji: '🍮'
  },
  {
    id: 5,
    name: 'Jilapi',
    category: 'flour-based',
    description: 'Crispy and sugary jalebi',
    price: '₹250/kg',
    emoji: '🌀'
  },
  {
    id: 6,
    name: 'Kachagolla',
    category: 'milk-based',
    description: 'Traditional kachagolla with cream filling',
    price: '₹320/kg',
    emoji: '⭕'
  },
  {
    id: 7,
    name: 'Payesh',
    category: 'seasonal',
    description: 'Rich and creamy rice pudding',
    price: '₹200/serving',
    emoji: '🥣'
  },
  {
    id: 8,
    name: 'Mishti Doi',
    category: 'milk-based',
    description: 'Sweet yogurt in clay pot',
    price: '₹150/pot',
    emoji: '🍯'
  },
  {
    id: 9,
    name: 'Barfi',
    category: 'flour-based',
    description: 'Chocolate and milk barfi',
    price: '₹450/kg',
    emoji: '📦'
  },
  {
    id: 10,
    name: 'Khir',
    category: 'seasonal',
    description: 'Traditional rice pudding with nuts',
    price: '₹180/serving',
    emoji: '🍚'
  },
  {
    id: 11,
    name: 'Doi Maalpoa',
    category: 'milk-based',
    description: 'Sweet maalpoa with yogurt',
    price: '₹280/kg',
    emoji: '🥛'
  },
  {
    id: 12,
    name: 'Sondesh Kari',
    category: 'flour-based',
    description: 'Shaped sandesh with variety',
    price: '₹420/kg',
    emoji: '🎨'
  }
];

// DOM Elements
const sweetsGrid = document.getElementById('sweets-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const orderForm = document.getElementById('orderForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSweets('all');
  setupEventListeners();
});

// Render Sweets
function renderSweets(category) {
  const filtered = category === 'all' 
    ? sweetsData 
    : sweetsData.filter(sweet => sweet.category === category);
  
  sweetsGrid.innerHTML = filtered.map(sweet => `
    <div class="sweet-card">
      <div class="sweet-image">${sweet.emoji}</div>
      <div class="sweet-info">
        <h3>${sweet.name}</h3>
        <p>${sweet.description}</p>
        <div class="sweet-price">${sweet.price}</div>
        <button class="btn btn-primary" onclick="addToOrder('${sweet.name}')">Add to Order</button>
      </div>
    </div>
  `).join('');
}

// Filter Functionality
function setupEventListeners() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderSweets(e.target.dataset.filter);
    });
  });

  // Hamburger Menu
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Form Submission
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleOrderSubmission();
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Add to Order
function addToOrder(sweetName) {
  const sweetsInput = document.getElementById('sweets');
  if (sweetsInput.value) {
    sweetsInput.value += `, ${sweetName}`;
  } else {
    sweetsInput.value = sweetName;
  }
  
  // Scroll to order form
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
  
  // Highlight the order form
  orderForm.style.border = '2px solid var(--accent-color)';
  setTimeout(() => {
    orderForm.style.border = 'none';
  }, 3000);
}

// Handle Form Submission
function handleOrderSubmission() {
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    sweets: document.getElementById('sweets').value,
    address: document.getElementById('address').value
  };

  // Validate form
  if (!formData.name || !formData.email || !formData.phone || !formData.sweets || !formData.address) {
    alert('Please fill all required fields!');
    return;
  }

  // Create WhatsApp message
  const message = `Hi Nilkanto Mistanna Bhandar,\n\nI would like to place an order:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Items:* ${formData.sweets}\n*Delivery Address:* ${formData.address}\n\nPlease confirm the order.`;
  
  const whatsappURL = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  
  // Show success message
  alert('Thank you for your order!\nWe will contact you shortly.\n\nRedirecting to WhatsApp for confirmation...');
  
  // Open WhatsApp
  window.open(whatsappURL, '_blank');
  
  // Reset form
  orderForm.reset();
}

// Scroll spy for nav links
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});