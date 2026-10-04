import React, { useState, useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MailIcon, CopyIcon, CheckIcon, GithubIcon, LinkedinIcon, ArrowUpRightIcon } from './Icons';

interface ContactProps {
  personal?: typeof PORTFOLIO_DATA.personal;
}

interface ActionResponse {
  success?: boolean;
  error?: string;
  name?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ personal = PORTFOLIO_DATA.personal }) => {
  const fetcher = useFetcher<ActionResponse>();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = fetcher.state === 'submitting';
  const isSuccess = fetcher.data?.success;
  const errorMsg = fetcher.data?.error;

  useEffect(() => {
    if (isSuccess && formRef.current) {
      formRef.current.reset();
    }
  }, [isSuccess]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">05 // INITIATE CONTACT</span>
          </div>
          <h2 className="section-title">Let’s Build Together</h2>
          <p className="section-subtitle">
            Whether discussing an engineering role, contract engagement, or design system consultation, my inbox is open.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Communication Card */}
          <div className="contact-info-panel">
            <div className="info-card">
              <span className="info-card-badge">Direct Communication</span>
              <h3 className="info-card-title">Available for Opportunities</h3>
              <p className="info-card-desc">
                Currently open to full-time frontend engineering positions, design system development, and select contract consulting.
              </p>

              {/* One-Click Copy Email Widget */}
              <div className="email-copy-box">
                <div className="email-display">
                  <MailIcon size={16} className="email-icon" />
                  <span className="email-address">{personal.email}</span>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  title="Copy to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <CheckIcon size={14} className="copied-icon" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status and SLA */}
              <div className="contact-meta-list">
                <div className="meta-item">
                  <span className="meta-dot green" />
                  <span className="meta-text"><strong>Response Time:</strong> Typically within 24 hours</span>
                </div>
                <div className="meta-item">
                  <span className="meta-dot blue" />
                  <span className="meta-text"><strong>Location:</strong> {personal.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-dot yellow" />
                  <span className="meta-text"><strong>Timezone:</strong> PST / UTC-8 (Global overlap)</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact-social-bar">
                <span className="social-bar-label">Profiles &amp; Repositories:</span>
                <div className="social-links-row">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn"
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                    <ArrowUpRightIcon size={11} />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn"
                  >
                    <LinkedinIcon size={15} />
                    <span>LinkedIn</span>
                    <ArrowUpRightIcon size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: React Router Data Mode Form (useFetcher) */}
          <div className="contact-form-panel">
            <fetcher.Form ref={formRef} method="post" action="/contact" className="contact-form">
              <div className="form-header">
                <h3 className="form-title">Send a Direct Message</h3>
                <span className="form-tag">Data Action API</span>
              </div>

              {isSuccess && (
                <div className="form-alert-success" role="alert">
                  <CheckIcon size={18} />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>{fetcher.data?.message || 'Thank you for reaching out. I will review your note and respond shortly.'}</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="form-alert-error" role="alert">
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Frontend Engineering Role / Project Inquiry"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your team, project requirements, or timeline..."
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary submit-btn"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <MailIcon size={15} />
                    </>
                  )}
                </button>
                <span className="privacy-note">Powered by React Router Data Action.</span>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </section>
  );
};
