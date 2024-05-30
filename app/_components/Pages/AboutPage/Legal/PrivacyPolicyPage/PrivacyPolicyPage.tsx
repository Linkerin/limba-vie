import Link from 'next/link';

import styles from '../LegalPages.module.css';

function PrivacyPolicyPage() {
  return (
    <article className={styles.article}>
      <h1>
        Privacy Policy for <span>Limba Vie</span>
      </h1>
      <p>
        Welcome to <strong>Limba Vie</strong>! We are committed to protecting
        your privacy. This Privacy Policy how the Limba Vie mobile web
        application (the &quot;Application&quot;, &quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your
        personal information as a user (&quot;User&quot;) when you use the
        Application. By accessing or using the Application, you agree to the
        terms of this Privacy Policy.
      </p>
      <ol>
        <li>
          <span>Personal identification information.</span> We may collect
          personal identification information from Users in a variety of ways,
          including, but not limited to, when Users use our Application,
          register on the Application, fill out a form, and in connection with
          other activities, services, features, or resources we make available
          on our Application. Users may be asked for, as appropriate, name,
          email address, and other contact information. We will collect personal
          identification information from Users only if they voluntarily submit
          such information to us. Users can always refuse to supply personal
          identification information, except that it may prevent them from
          engaging in certain Application-related activities.
        </li>
        <li>
          <span>Non-personal identification information.</span> We may collect
          non-personal identification information about Users whenever they
          interact with our Application. Non-personal identification information
          may include the browser name, the type of computer or device, and
          technical information about Users&apos; means of connection to our
          Application, such as the operating system and the Internet service
          provider utilised and other similar information.
        </li>
        <li>
          <span>Web browser cookies.</span> Our Application uses
          &quot;cookies&quot; to enhance User&apos;s experience. Users&apos; web
          browsers place cookies on their hard drive for record-keeping purposes
          and sometimes to track information about them. Users may choose to set
          their web browser to refuse cookies or to alert them when cookies are
          being sent. If they do so, note that some parts of the Application may
          not function properly. You can find more information on how to manage
          cookies in your browser&apos;s help section.
        </li>
        <li>
          <span> How we use collected information.</span> We may collect and use
          Users&apos; personal information for the following purposes:
          <ul>
            <li>
              To improve customer service: the information you provide helps us
              respond to your customer service requests and support needs more
              efficiently.
            </li>
            <li>
              To personalize User&apos;s experience: we may use aggregated
              information to understand how our Users as a group use the
              services and resources provided on our Application.
            </li>
            <li>
              To improve our Application: we may use feedback you provide to
              improve our products and services.
            </li>
            <li>
              To send periodic emails: we may use the email address to send
              Users information and updates pertaining to their account or to
              respond to their inquiries, questions, and/or other requests.
            </li>
          </ul>
        </li>
        <li>
          <span>How we protect your information.</span> We adopt appropriate
          data collection, storage, and processing practices and security
          measures to protect against unauthorised access, alteration,
          disclosure, or destruction of your personal information, username,
          password, transaction information, and data stored on our Application.
        </li>
        <li>
          <span>Sharing your personal information.</span> We do not sell, trade,
          or rent Users&apos; personal identification information to others. We
          may share generic aggregated demographic information not linked to any
          personal identification information regarding visitors and users with
          our business partners, trusted affiliates, and advertisers for the
          purposes outlined above.
        </li>
        <li>
          <span>Changes to this Privacy Policy.</span> We reserve the right to
          modify or replace this Privacy Policy at any time, without prior
          notice or liability to you. These modifications shall be effective
          immediately upon posting of the modified Privacy Policy on the
          Application. Your continued use of the Application following the
          posting of any changes constitutes acceptance of those changes. You
          acknowledge and agree that it is your responsibility to review this
          Privacy Policy periodically and become aware of modifications.
        </li>
        <li>
          <span>Your acceptance of these terms.</span> By using the Application,
          you signify your acceptance of this Privacy Policy. If you do not
          agree to this Privacy Policy, please do not use our Application. Your
          continued use of the Application following the posting of changes to
          this Privacy Policy will be deemed your acceptance of those changes.
        </li>
        <li>
          <span>Ownership and Disposal of User Content.</span> Users of the
          Application acknowledge and agree that all content posted on the
          Application, including but not limited to their attributes, comments
          and other materials, becomes the property of the Application upon
          posting. By posting content on the Application, users grant the
          Application a non-exclusive, transferable, sub-licensable,
          royalty-free, worldwide license to use, reproduce, modify, adapt,
          publish, translate, create derivative works from, distribute, and
          display such content in any media, format, or platform, whether now
          known or hereafter developed. Users also acknowledge and agree that
          the Application may dispose of such content at its discretion, without
          any obligation to compensate or notify the User.
        </li>
        <li>
          <span>Contacting us.</span> If you have any questions about this
          Privacy Policy, please contact us at{' '}
          <Link aria-label="Contact e-mail" href="mailto:limba@snipshot.dev">
            limba@snipshot.dev
          </Link>
        </li>
      </ol>
      <p>
        Your use of the Application is also governed by our{' '}
        <Link aria-label="Terms of Use page" href="/about/legal/terms-of-use">
          Terms of Use
        </Link>
        . Please review the Terms of Use to understand how we govern your access
        to and use of the Limba Vie mobile web application.
      </p>
      <p>
        This document was last updated on <strong>May 30th, 2024</strong>.
      </p>
    </article>
  );
}

export default PrivacyPolicyPage;
