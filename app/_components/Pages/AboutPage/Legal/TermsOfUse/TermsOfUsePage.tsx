import Link from 'next/link';

import styles from '../LegalPages.module.css';

function TermsOfUsePage() {
  return (
    <article className={styles.article}>
      <h1>
        Terms of Use for <span>Limba Vie</span>
      </h1>
      <p>
        Welcome to <strong>Limba Vie</strong>! These Terms of Use
        (&quot;Terms&quot;) govern your access to and use of the Limba Vie
        mobile web application (the &quot;Application&quot;, &quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;). By accessing or using the
        Application, you agree to comply with and be bound by these Terms, all
        applicable laws, and regulations. If you do not agree with any part of
        these Terms, please do not use the Application.
      </p>
      <ol>
        <li>
          <span>Intellectual Property.</span> The Application and its entire
          contents, features, and functionality (including but not limited to
          all information, software, text, displays, images, video, and audio,
          and the design, selection, and arrangement thereof) are owned by the
          Application, its licensors, or other providers of such material and
          are protected by international copyright, trademark, patent, trade
          secret, and other intellectual property or proprietary rights laws. We
          grant you a limited, non-exclusive, non-transferable, and revocable
          license to use the App for personal, non-commercial purposes in
          accordance with these Terms.
        </li>
        <li>
          <span>Links to Third-Party Websites or Resources.</span> The
          Application may contain links to third-party websites or resources.
          The Application provides these links only as a convenience and is not
          responsible for the content, products, or services on or available
          from those websites or resources. You acknowledge sole responsibility
          and assume all risks arising from your use of any third-party websites
          or resources.
        </li>
        <li>
          <span>Disclaimer of Warranties.</span> The Application is provided on
          an &quot;as-is&quot; and &quot;as-available&quot; basis. We make no
          warranties or representations about the accuracy or completeness of
          the content available on or through the Application. To the fullest
          extent permitted by law, we disclaim all warranties, whether express
          or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </li>
        <li>
          <span> Limitation of Liability.</span> In no event shall the
          Application, its affiliates, licensors, or service providers be liable
          for any direct or indirect, consequential, punitive, special, or
          incidental damages, including, without limitation, damages for loss of
          profits, data, or other intangibles, arising out of or relating from:
          <ul>
            <li>Your use of or inability to use the Application.</li>
            <li>
              Any unauthorized access to or use of our servers and/or any
              personal information stored therein.
            </li>
            <li>
              Any interruption or cessation of transmission to or from the
              Application.
            </li>
            <li>
              Any bugs, viruses, malicious code, or the like that may be
              transmitted to or through the Application by any third party.
            </li>
            <li>
              Any errors or omissions in any content or for any loss or damage
              incurred as a result of the use of any content posted, emailed,
              transmitted, or otherwise made available through the Application.
            </li>
          </ul>
        </li>
        <li>
          <span>Indemnification.</span> You agree to indemnify and hold the
          Application, its affiliates, licensors, and service providers harmless
          from any claim or demand, including reasonable attorneys&apos; fees,
          made by any third party due to or arising out of your use of the
          Application, your violation of these Terms, or your violation of any
          rights of another.
        </li>
        <li>
          <span>Account Registration.</span> To access certain features of the
          Application, you may be required to create an account. You agree to
          provide accurate, current, and complete information during the
          registration process and to keep this information up to date. You are
          responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account.
        </li>
        <li>
          <span>Prohibited Activities.</span> You agree not to:
          <ul>
            <li>
              Use the Application for any illegal or unauthorized purpose.
            </li>
            <li>Interfere with or disrupt the operation of the Application.</li>
            <li>
              Attempt to gain unauthorized access to the Application or its
              related systems or networks.
            </li>
            <li>
              Use the Application to transmit any harmful or disruptive code,
              such as viruses or malware.
            </li>
            <li>
              Reproduce, duplicate, copy, sell, or exploit any portion of the
              Application without our express written permission.
            </li>
          </ul>
        </li>
        <li>
          <span>Changes to These Terms.</span> We reserve the right to modify or
          replace these Terms at any time, without prior notice or liability to
          you. These modifications shall be effective immediately upon posting
          of the modified Terms on the Application. Your continued use of the
          Application following the posting of any changes constitutes
          acceptance of those changes. You acknowledge and agree that it is your
          responsibility to review these Terms periodically and become aware of
          modifications.
        </li>
        <li>
          <span>Termination.</span> These Terms and your access to the
          Application may be terminated at any time, for any reason, without
          prior notice or liability to you. Upon termination, your right to use
          the App will immediately cease.
        </li>
        <li>
          <span>Miscellaneous.</span> These Terms constitute the entire
          agreement between you and the Application regarding the use of the
          Application. If any provision of these Terms is found to be invalid or
          unenforceable, the remaining provisions shall be enforced to the
          fullest extent possible, and the remaining provisions of the Terms
          shall remain in full force and effect. The failure of the Application
          to enforce any right or provision of these Terms shall not be deemed a
          waiver of such right or provision.
        </li>
        <li>
          <span>Contacting us.</span> If you have any questions about these
          Terms or the Application, please contact us at{' '}
          <Link aria-label="Contact e-mail" href="mailto:limba@snipshot.dev">
            limba@snipshot.dev
          </Link>
        </li>
      </ol>
      <p>
        Your use of the Application is also governed by our{' '}
        <Link
          aria-label="Privacy Policy page"
          href="/about/legal/privacy-policy"
        >
          Privacy Policy
        </Link>
        . Please review the Privacy Policy to understand how we collect, use,
        and protect your information.
      </p>
      <p>
        This document was last updated on <strong>May 30th, 2024</strong>.
      </p>
    </article>
  );
}

export default TermsOfUsePage;
