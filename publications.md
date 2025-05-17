---
title: "Peer-Reviewed Publications"
layout: single
permalink: /publications/
author_profile: true
---

<ol class="bibliography">
  {% if site.data.publications and site.data.publications != empty %}
    {% for entry in site.data.publications %}
      <li>
        <div class="publication-entry" style="margin-bottom: 1em; line-height: 1.6;">
          {% if entry.authors %}
            <span class="authors">{{ entry.authors }}</span>
          {% endif %}

          {% if entry.year %}
            <span class="year"> ({{ entry.year }}).</span>
          {% endif %}

          <span class="title">
            {% if entry.title %}
              {% if entry.doi %}
                <a href="https://doi.org/{{ entry.doi | escape }}" target="_blank" rel="noopener"><strong>{{ entry.title }}</strong></a>.
              {% else %}
                <strong>{{ entry.title }}</strong>.
              {% endif %}
            {% else %}
              <span style="color:red;">Error: Missing title for entry with ID: {{ entry.id }}</span>
            {% endif %}
          </span>

          {% if entry.journal %}
            <span class="journal"><em>{{ entry.journal }}</em></span>{% if entry.volume %}, {{ entry.volume }}{% endif %}{% if entry.number %} ({{ entry.number }}){% endif %}{% if entry.pages %}: {{ entry.pages }}{% endif %}.
          {% elsif entry.type == 'phdthesis' and entry.school %} {# Example for other types you might add #}
            <span class="school"><em>{{ entry.school }}</em>.</span>
          {% elsif entry.type == 'inproceedings' and entry.booktitle %}  {# Example for other types #}
            <span class="booktitle">In <em>{{ entry.booktitle }}</em>{% if entry.pages %}, pp. {{ entry.pages }}{% endif %}.</span>
          {% elsif entry.booktitle %}
            <span class="booktitle">In <em>{{ entry.booktitle }}</em>.</span>
          {% endif %}

          {% comment %}
            The section below, which used to display the DOI link text separately,
            is now commented out. This means only the title will be the link to the DOI.
          {% endcomment %}
          {% comment %}
          {% if entry.doi %}
            <span class="doi-link" style="margin-left: 5px;">
              <a href="https://doi.org/{{ entry.doi | escape }}" target="_blank" rel="noopener">https://doi.org/{{ entry.doi | escape }}</a>
            </span>
          {% endif %}
          {% endcomment %}
        </div>
      </li>
    {% endfor %}
  {% else %}
    <p>No publications found in <code>_data/publications.yml</code>. Please check the file.</p>
  {% endif %}
</ol>