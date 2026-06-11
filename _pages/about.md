---
permalink: /
title: "Yibin Lin (林熠彬)"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<section class="home-hero">
  <div class="home-hero__copy">
    <p class="home-hero__eyebrow">About Me</p>
    <p class="home-hero__lead">
      I am an undergraduate student majoring in <strong>Computer Science and Technology</strong> at
      <strong>Xi'an Jiaotong University (XJTU)</strong>. This homepage brings together my academic background,
      selected work, and future updates in one place.
    </p>
  </div>

  <aside class="blog-teaser-card">
    <p class="blog-teaser-card__eyebrow">Blog</p>
    <h2 class="blog-teaser-card__title">A standalone blog is on the way.</h2>
    <p class="blog-teaser-card__lead">
      I plan to launch a separate blog for notes, technical writing, and life updates under its own domain.
    </p>
    <div class="blog-teaser-card__orbit">
      <span>Notes</span>
      <span>Projects</span>
      <span>Life</span>
    </div>
    {% if site.external_blog_url %}
      <a class="blog-teaser-card__link" href="{{ site.external_blog_url }}">Visit Blog</a>
    {% else %}
      <span class="blog-teaser-card__link blog-teaser-card__link--muted">Domain coming soon</span>
    {% endif %}
  </aside>
</section>

<section class="home-section">
  <div class="home-section__header">
    <p class="home-section__eyebrow">Education</p>
    <h2 class="home-section__title">Academic background</h2>
  </div>

  <article class="education-card">
    <div class="education-card__identity">
      <img
        class="education-card__logo"
        src="/images/XJTU_emblem.svg"
        alt="Xi'an Jiaotong University logo"
      />
      <div>
        <h3>Xi'an Jiaotong University</h3>
        <p>B.S. in Computer Science and Technology</p>
        <p>2023.09 – Present</p>
      </div>
    </div>

    <div class="education-card__stats">
      <div>
        <span>Freshman Rank</span>
        <strong>17/193</strong>
      </div>
      <div>
        <span>Sophomore Rank</span>
        <strong>28/187</strong>
      </div>
      <div>
        <span>Scholarships</span>
        <strong>Second-Class, 2x</strong>
      </div>
    </div>

    <div class="education-card__courses">
      <span>Linear Algebra 99</span>
      <span>Advanced Mathematics 95</span>
      <span>Data Structures 90</span>
      <span>OOP 98</span>
      <span>Digital Logic Circuits 90</span>
      <span>Probability Theory 89</span>
      <span>ICS 96</span>
      <span>Computer Graphics 95</span>
      <span>Computer Networks 89</span>
      <span>Operating Systems 85</span>
    </div>
  </article>
</section>

<section class="home-grid">
  <article class="home-card">
    <div class="home-section__header">
      <p class="home-section__eyebrow">Honors</p>
      <h2 class="home-section__title">Awards and distinctions</h2>
    </div>
    <ul class="home-list">
      <li><strong>Meritorious Winner (M奖)</strong> — Mathematical Contest in Modeling (MCM/ICM)</li>
      <li><strong>Third Prize</strong> — RoboCup China Competition</li>
      <li><strong>Second-Class Scholarship</strong> — Xi'an Jiaotong University</li>
      <li><strong>Excellent Student Award</strong> — Xi'an Jiaotong University</li>
    </ul>
  </article>
</section>

<section class="home-section">
  <div class="home-section__header">
    <p class="home-section__eyebrow">Publications</p>
    <h2 class="home-section__title">Selected work</h2>
  </div>

  {% if site.publications and site.publications.size > 0 %}
    <div class="publication-list">
      {% for post in site.publications reversed %}
        <article class="publication-entry">
          <div class="publication-entry__meta">
            <span>{{ post.venue }}</span>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y" }}</time>
          </div>
          <h3 class="publication-entry__title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          {% if post.excerpt %}
            <p class="publication-entry__excerpt">{{ post.excerpt }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <article class="education-card">
      <p class="home-card__empty">Publication updates will be added here.</p>
    </article>
  {% endif %}
</section>
