/**
 * SeedLink Client Onboarding — Google Form Generator
 *
 * Run this script in Google Apps Script (script.google.com) to auto-create
 * the client onboarding questionnaire as a Google Form.
 *
 * After creation, the form will POST submissions to the n8n webhook
 * via the onFormSubmit trigger.
 *
 * Setup:
 * 1. Go to script.google.com → New Project
 * 2. Paste this entire file
 * 3. Set N8N_WEBHOOK_URL below to your n8n onboarding-questionnaire webhook URL
 * 4. Run createOnboardingForm()
 * 5. Run setupFormSubmitTrigger()
 * 6. Check your Google Drive for "SeedLink — Client Onboarding Questionnaire"
 */

// ──────────────────────────────────────────────
// CONFIGURATION — UPDATE THESE
// ──────────────────────────────────────────────
const N8N_WEBHOOK_URL = 'https://YOUR_N8N_INSTANCE.app.n8n.cloud/webhook/onboarding-questionnaire';

// ──────────────────────────────────────────────
// FORM CREATION
// ──────────────────────────────────────────────

function createOnboardingForm() {
  const form = FormApp.create('SeedLink — Client Onboarding Questionnaire');
  form.setDescription(
    'Welcome to SeedLink! This questionnaire helps us configure your AI content automation. ' +
    'Takes about 10 minutes. Sections 5 and 6 are optional if you didn\'t purchase those modules.\n\n' +
    'After you submit, our system will automatically:\n' +
    '• Generate your Voice Profile\n' +
    '• Set up your editorial calendar\n' +
    '• Configure your content pipeline\n' +
    '• Notify our team to begin your build'
  );
  form.setConfirmationMessage(
    'Thank you! Your onboarding is now being processed.\n\n' +
    'What happens next:\n' +
    '1. Your Voice Profile is being generated (takes ~2 minutes)\n' +
    '2. Your Google Sheets content hub is being created\n' +
    '3. Our team will reach out within 24 hours to schedule your kickoff call\n\n' +
    'Questions? Email support@seedlink.app'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);

  // ──────────────────────────────────────────
  // SECTION 1: BUSINESS INFORMATION
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 1: Business Information')
    .setHelpText('Tell us about your company so we can tailor content to your brand.');

  // Client ID — hidden field passed via URL parameter (pre-filled from Stripe)
  form.addTextItem()
    .setTitle('Client ID')
    .setHelpText('This should be pre-filled from your purchase confirmation email. If blank, check your email for the onboarding link.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Company Name')
    .setHelpText('Your business or brand name as it should appear in content.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Company Description')
    .setHelpText('Describe what your company does in 2-3 sentences. This is used as context for all AI-generated content.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Website URL')
    .setHelpText('Your main website (e.g., https://yourcompany.com)')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Target Audience / ICP')
    .setHelpText('Who are you trying to reach? (e.g., "Series A founders building AI products" or "SMB owners looking to automate operations")')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Industry')
    .setHelpText('Your industry or vertical (e.g., SaaS, E-commerce, FinTech, Healthcare)')
    .setRequired(false);

  // ──────────────────────────────────────────
  // SECTION 2: VOICE & TONE
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 2: Voice & Tone')
    .setHelpText('We use this to build your Voice Profile — the "DNA" that makes all AI content sound like you.');

  const hasContent = form.addMultipleChoiceItem()
    .setTitle('Do you have existing content we can analyze?')
    .setHelpText('If you have blog posts, LinkedIn posts, or other written content, our Voice Extractor can analyze it to capture your natural voice.')
    .setRequired(true);

  hasContent.setChoices([
    hasContent.createChoice('Yes — I have existing content to share'),
    hasContent.createChoice('No — I\'m starting fresh')
  ]);

  // Voice Extractor path
  form.addParagraphTextItem()
    .setTitle('Content Sample URLs')
    .setHelpText('If you have existing content, paste 3-5 URLs (blog posts, LinkedIn articles, etc.) — one per line. Leave blank if starting fresh.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Reference Voices')
    .setHelpText('Are there writers or brands whose tone you admire? (e.g., "Paul Graham\'s essays," "Stripe\'s blog," "Seth Godin\'s conversational style")')
    .setRequired(false);

  // Voice Builder path
  form.addSectionHeaderItem()
    .setTitle('Voice Preferences (If Starting Fresh)')
    .setHelpText('Answer these quick preference pairs to help us build your voice from scratch. Skip this section if you provided content samples above.');

  form.addMultipleChoiceItem()
    .setTitle('Tone: Professional vs. Casual')
    .setHelpText('How formal should your content sound?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Professional — polished, authoritative'),
      form.addMultipleChoiceItem().createChoice('Casual — conversational, approachable'),
      form.addMultipleChoiceItem().createChoice('Somewhere in between')
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Perspective: First Person vs. Brand Voice')
    .setHelpText('Should content be written as "I" (founder voice) or "We" (company voice)?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('First person — "I built this because..."'),
      form.addMultipleChoiceItem().createChoice('Brand voice — "We believe..."'),
      form.addMultipleChoiceItem().createChoice('Mix of both')
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Depth: Technical vs. Accessible')
    .setHelpText('How technical should your content be?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Technical — detailed, assumes expertise'),
      form.addMultipleChoiceItem().createChoice('Accessible — simplified, explains concepts'),
      form.addMultipleChoiceItem().createChoice('Technical with accessible explanations')
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Energy: Bold vs. Measured')
    .setHelpText('What energy should your content carry?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Bold — opinionated, takes strong stances'),
      form.addMultipleChoiceItem().createChoice('Measured — balanced, presents multiple sides'),
      form.addMultipleChoiceItem().createChoice('Bold on core beliefs, measured elsewhere')
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Words to Use')
    .setHelpText('Words or phrases that should appear naturally in your content (e.g., "ship fast," "founder-led," "real-world AI"). Comma-separated.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Words to Avoid')
    .setHelpText('Words or phrases that should NEVER appear (e.g., "synergy," "disruptive," "game-changer," "leverage"). Comma-separated.')
    .setRequired(false);

  // ──────────────────────────────────────────
  // SECTION 3: CONTENT STRATEGY
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 3: Content Strategy')
    .setHelpText('Tell us about your content goals so we can configure the right pipeline.');

  form.addParagraphTextItem()
    .setTitle('Content Pillars / Themes')
    .setHelpText('What topics should your content cover? List 3-5 themes, one per line. (e.g., "AI implementation for startups\\nFounder lessons\\nProduct updates\\nIndustry trends")')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Target Keywords')
    .setHelpText('SEO keywords you want to rank for. One per line. (e.g., "AI automation for startups\\nhire AI engineers\\nAI tools marketplace")')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('CMS Platform')
    .setHelpText('Where does your blog live?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('WordPress'),
      form.addMultipleChoiceItem().createChoice('Ghost'),
      form.addMultipleChoiceItem().createChoice('Webflow'),
      form.addMultipleChoiceItem().createChoice('Custom CMS'),
      form.addMultipleChoiceItem().createChoice('No blog yet — help me set one up')
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Content Cadence')
    .setHelpText('How many blog posts per month?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('2 per month'),
      form.addMultipleChoiceItem().createChoice('4 per month (weekly)'),
      form.addMultipleChoiceItem().createChoice('8 per month (twice weekly)'),
      form.addMultipleChoiceItem().createChoice('Not sure — recommend for me')
    ])
    .setRequired(true);

  // ──────────────────────────────────────────
  // SECTION 4: SOCIAL MEDIA
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 4: Social Media')
    .setHelpText('We derive social posts from your blog content automatically.');

  form.addCheckboxItem()
    .setTitle('Social Platforms')
    .setHelpText('Which platforms should we publish to?')
    .setChoices([
      form.addCheckboxItem().createChoice('LinkedIn'),
      form.addCheckboxItem().createChoice('X / Twitter'),
      form.addCheckboxItem().createChoice('Both')
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Do you have a Buffer account?')
    .setHelpText('We use Buffer for scheduling social posts. If not, we can help set one up.')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Yes'),
      form.addMultipleChoiceItem().createChoice('No'),
      form.addMultipleChoiceItem().createChoice('I use a different scheduler (Typefully, Hootsuite, etc.)')
    ])
    .setRequired(true);

  // ──────────────────────────────────────────
  // SECTION 5: LINKEDIN OUTREACH (OPTIONAL)
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 5: LinkedIn Outreach (Optional)')
    .setHelpText('Only fill this out if you purchased the LinkedIn Outreach module.');

  form.addParagraphTextItem()
    .setTitle('LinkedIn Profile URLs')
    .setHelpText('LinkedIn profile URLs to use for outreach (one per line). Leave blank if not applicable.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Do you have a Prosp.AI account?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Yes'),
      form.addMultipleChoiceItem().createChoice('No'),
      form.addMultipleChoiceItem().createChoice('N/A — didn\'t purchase outreach module')
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('CRM Platform')
    .setHelpText('Do you use a CRM? We can sync leads from outreach.')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('None'),
      form.addMultipleChoiceItem().createChoice('HubSpot'),
      form.addMultipleChoiceItem().createChoice('Pipedrive'),
      form.addMultipleChoiceItem().createChoice('Salesforce'),
      form.addMultipleChoiceItem().createChoice('Other')
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Calendly / Booking URL')
    .setHelpText('Link for scheduling meetings from outreach responses (e.g., https://calendly.com/you/30min)')
    .setRequired(false);

  // ──────────────────────────────────────────
  // SECTION 6: TECHNICAL SETUP
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 6: Technical Setup')
    .setHelpText('A few technical details to configure your integrations.');

  form.addMultipleChoiceItem()
    .setTitle('Notification Preference')
    .setHelpText('How should we notify you when content is ready for review?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Slack'),
      form.addMultipleChoiceItem().createChoice('Email'),
      form.addMultipleChoiceItem().createChoice('Both')
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Slack Webhook URL')
    .setHelpText('If you chose Slack: paste your incoming webhook URL. (Slack → Apps → Incoming Webhooks → Add New)')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Will you provide your own Anthropic API key?')
    .setHelpText('If yes, you control your own AI costs (~$12/month at 4 posts/week). If no, we\'ll use a shared key and include it in your subscription.')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Yes — I\'ll provide my own key'),
      form.addMultipleChoiceItem().createChoice('No — use the shared key')
    ])
    .setRequired(true);

  // ──────────────────────────────────────────
  // SECTION 7: ANYTHING ELSE
  // ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Section 7: Anything Else')
    .setHelpText('Last chance to share context that will help us build the right thing.');

  form.addParagraphTextItem()
    .setTitle('Additional Notes')
    .setHelpText('Anything else we should know? Specific competitors to monitor, upcoming launches, content you\'ve tried before that didn\'t work, etc.')
    .setRequired(false);

  // Log the form URL
  Logger.log('Form created: ' + form.getEditUrl());
  Logger.log('Form response URL: ' + form.getPublishedUrl());
  Logger.log('Form ID: ' + form.getId());

  // Store form ID in script properties for the trigger
  PropertiesService.getScriptProperties().setProperty('FORM_ID', form.getId());

  return form;
}

// ──────────────────────────────────────────────
// FORM SUBMIT TRIGGER — POSTS TO N8N WEBHOOK
// ──────────────────────────────────────────────

function setupFormSubmitTrigger() {
  const formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!formId) {
    throw new Error('Form ID not found. Run createOnboardingForm() first.');
  }

  const form = FormApp.openById(formId);

  // Delete existing triggers for this form
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new submit trigger
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log('Form submit trigger created successfully.');
}

/**
 * Fires when the form is submitted. Maps responses to the expected
 * webhook payload and POSTs to n8n.
 */
function onFormSubmit(e) {
  const responses = e.response.getItemResponses();
  const email = e.response.getRespondentEmail();

  // Build payload by mapping form question titles to webhook field names
  const fieldMap = {
    'Client ID': 'client_id',
    'Company Name': 'company_name',
    'Company Description': 'company_description',
    'Website URL': 'website_url',
    'Target Audience / ICP': 'target_audience',
    'Industry': 'industry',
    'Do you have existing content we can analyze?': 'has_existing_content',
    'Content Sample URLs': 'content_samples',
    'Reference Voices': 'reference_voices',
    'Tone: Professional vs. Casual': 'voice_style',
    'Perspective: First Person vs. Brand Voice': 'person_preference',
    'Depth: Technical vs. Accessible': 'depth_preference',
    'Energy: Bold vs. Measured': 'energy_preference',
    'Words to Use': 'words_to_use',
    'Words to Avoid': 'words_to_avoid',
    'Content Pillars / Themes': 'content_pillars',
    'Target Keywords': 'target_keywords',
    'CMS Platform': 'cms_platform',
    'Content Cadence': 'posts_per_month',
    'Social Platforms': 'social_platforms',
    'Do you have a Buffer account?': 'has_buffer',
    'LinkedIn Profile URLs': 'linkedin_profiles',
    'Do you have a Prosp.AI account?': 'has_prospai',
    'CRM Platform': 'crm_platform',
    'Calendly / Booking URL': 'calendly_url',
    'Notification Preference': 'notification_channel',
    'Slack Webhook URL': 'slack_webhook',
    'Will you provide your own Anthropic API key?': 'has_anthropic_key',
    'Additional Notes': 'notes'
  };

  const payload = {
    client_email: email,
    submitted_at: new Date().toISOString(),
    source: 'google_form'
  };

  responses.forEach(itemResponse => {
    const title = itemResponse.getItem().getTitle();
    const fieldName = fieldMap[title];
    if (fieldName) {
      let value = itemResponse.getResponse();

      // Transform specific fields
      if (fieldName === 'has_existing_content') {
        value = value.startsWith('Yes');
      }
      if (fieldName === 'has_buffer') {
        value = value === 'Yes';
      }
      if (fieldName === 'has_prospai') {
        value = value === 'Yes';
      }
      if (fieldName === 'has_anthropic_key') {
        value = value.startsWith('Yes');
      }
      if (fieldName === 'content_samples' || fieldName === 'linkedin_profiles') {
        value = value.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      }
      if (fieldName === 'content_pillars' || fieldName === 'target_keywords') {
        value = value.split('\n').map(s => s.trim()).filter(s => s.length > 0).join(', ');
      }
      if (fieldName === 'posts_per_month') {
        const match = value.match(/(\d+)/);
        value = match ? parseInt(match[1]) : 4;
      }
      if (fieldName === 'cms_platform') {
        value = value.toLowerCase().replace(/\s.*/g, '');
      }
      if (fieldName === 'social_platforms') {
        if (Array.isArray(value)) {
          value = value.map(v => v.toLowerCase().replace('x / twitter', 'twitter')).join(',');
        }
      }
      if (fieldName === 'notification_channel') {
        value = value.toLowerCase();
      }
      if (fieldName === 'crm_platform') {
        value = value.toLowerCase();
      }

      payload[fieldName] = value;
    }
  });

  // Determine voice path
  payload.voice_path = payload.has_existing_content ? 'extractor' : 'builder';

  // Build voice_preferences object for Builder path
  if (!payload.has_existing_content) {
    payload.voice_preferences = {
      tone: payload.voice_style || null,
      perspective: payload.person_preference || null,
      depth: payload.depth_preference || null,
      energy: payload.energy_preference || null,
      words_to_use: payload.words_to_use || '',
      words_to_avoid: payload.words_to_avoid || ''
    };
  }

  // POST to n8n webhook
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(N8N_WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();

    Logger.log('Webhook response: ' + responseCode + ' — ' + responseBody);

    if (responseCode !== 200) {
      // Send error notification email
      MailApp.sendEmail({
        to: email,
        subject: 'SeedLink Onboarding — Submission Issue',
        body: 'Your onboarding form was received, but there was a processing issue. ' +
              'Our team has been notified and will reach out within 24 hours.\n\n' +
              'If you need immediate help, email support@seedlink.app'
      });

      // Also notify admin
      MailApp.sendEmail({
        to: 'support@seedlink.app',
        subject: '[ALERT] Onboarding webhook failed — ' + payload.company_name,
        body: 'Webhook returned ' + responseCode + '\n\n' +
              'Payload:\n' + JSON.stringify(payload, null, 2) + '\n\n' +
              'Response:\n' + responseBody
      });
    }
  } catch (error) {
    Logger.log('Webhook error: ' + error.message);

    // Notify admin of failure
    MailApp.sendEmail({
      to: 'support@seedlink.app',
      subject: '[CRITICAL] Onboarding webhook unreachable — ' + payload.company_name,
      body: 'Error: ' + error.message + '\n\n' +
            'Payload:\n' + JSON.stringify(payload, null, 2)
    });
  }
}

// ──────────────────────────────────────────────
// UTILITY: Pre-fill URL generator
// ──────────────────────────────────────────────

/**
 * Generates a pre-filled form URL with the client_id from Stripe.
 * Call this from the Stripe checkout success page or confirmation email.
 *
 * Usage: generatePrefilledUrl('cus_abc123')
 * Returns: https://docs.google.com/forms/d/.../viewform?usp=pp_url&entry.XXXXX=cus_abc123
 */
function generatePrefilledUrl(clientId) {
  const formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  const form = FormApp.openById(formId);
  const items = form.getItems();

  // Find the Client ID field
  const clientIdItem = items.find(item => item.getTitle() === 'Client ID');
  if (!clientIdItem) {
    throw new Error('Client ID field not found in form');
  }

  const prefilledUrl = form.createResponse()
    .withItemResponse(clientIdItem.asTextItem().createResponse(clientId))
    .toPrefilledUrl();

  Logger.log('Pre-filled URL: ' + prefilledUrl);
  return prefilledUrl;
}
