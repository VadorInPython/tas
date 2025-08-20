---
title: "Contact"
date: 2025-08-20
draft: false
---

<div style="text-align: center; margin-bottom: 30px;">
  <div class="contact-form-container" style="background: white; border-radius: 32px; padding: 2rem; margin: 2rem auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); max-width: 600px; border: 3px solid transparent; position: relative;">
    <div style="position: absolute; top: -3px; left: -3px; right: -3px; bottom: -3px; background: linear-gradient(135deg, #5b7db1, #142850); border-radius: 32px; z-index: -1;"></div>
    
    <form class="contact-form" action="#" method="POST" style="all: unset; display: block;">
      <div style="margin-bottom: 1.2rem;">
        <label for="name" style="display: block; margin-bottom: 0.4rem; font-weight: 500; color: #142850; font-size: 1rem;">Name *</label>
        <input type="text" id="name" name="name" required style="width: 100%; padding: 0.8rem; border: 2px solid #e0e6ed; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 1.2rem;">
        <label for="email" style="display: block; margin-bottom: 0.4rem; font-weight: 500; color: #142850; font-size: 1rem;">Email *</label>
        <input type="email" id="email" name="email" required style="width: 100%; padding: 0.8rem; border: 2px solid #e0e6ed; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease; box-sizing: border-box;">
      </div>

      <div style="margin-bottom: 1.2rem;">
        <label for="subject" style="display: block; margin-bottom: 0.4rem; font-weight: 500; color: #142850; font-size: 1rem;">Subject *</label>
        <select id="subject" name="subject" required style="width: 100%; padding: 0.8rem; border: 2px solid #e0e6ed; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease; box-sizing: border-box;">
          <option value="">Choose a topic...</option>
          <option value="general">General Question</option>
          <option value="collaboration">Collaboration</option>
          <option value="feedback">Feedback</option>
          <option value="music">Music Related</option>
          <option value="photography">Photography</option>
          <option value="studies">Studies & Education</option>
          <option value="travel">Travel Tips</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style="margin-bottom: 1.2rem;">
        <label for="message" style="display: block; margin-bottom: 0.4rem; font-weight: 500; color: #142850; font-size: 1rem;">Your Message *</label>
        <textarea id="message" name="message" placeholder="Tell me what's on your mind..." required style="width: 100%; padding: 0.8rem; border: 2px solid #e0e6ed; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease; box-sizing: border-box; min-height: 100px; resize: vertical;"></textarea>
      </div>

      <div style="display: flex; align-items: flex-start; gap: 0.5rem; margin: 1.2rem 0;">
        <input type="checkbox" id="privacy" name="privacy" required style="width: auto; margin: 0; transform: scale(1.1); margin-top: 2px;">
        <label for="privacy" style="margin: 0; font-size: 0.9rem; line-height: 1.4; cursor: pointer;">I agree to the processing of my personal data for the purpose of responding to my inquiry.</label>
      </div>

      <button type="submit" style="background: linear-gradient(135deg, #5b7db1, #142850); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.3s ease; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">Send Message</button>
    </form>
  </div>
</div>

<style>
.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
  outline: none !important;
  border-color: #5b7db1 !important;
  box-shadow: 0 0 0 3px rgba(91, 125, 177, 0.1) !important;
}

.contact-form button:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 15px rgba(91, 125, 177, 0.3) !important;
}

.contact-form button:active {
  transform: translateY(0) !important;
}

@media (max-width: 768px) {
  .contact-form-container {
    margin: 1rem auto !important;
    padding: 1.5rem !important;
    border-radius: 24px !important;
  }
  
  .contact-form-container > div:first-child {
    border-radius: 24px !important;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      const privacy = document.getElementById('privacy').checked;
      
      if (!name || !email || !subject || !message || !privacy) {
        alert('Please fill in all required fields and accept the privacy policy.');
        return;
      }
      
      alert('Thanks for your message! I\'ll get back to you soon.');
      this.reset();
    });
  }
});
</script>