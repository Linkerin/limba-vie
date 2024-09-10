import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import { css } from '@/styled-system/css';

const articleStyles = css({
  '& p': {
    marginBlockEnd: '4'
  },
  '& i': {
    fontStyle: 'italic'
  },

  '& strong': {
    fontWeight: 'bold'
  },

  '& code': {
    marginInlineEnd: '0.125em'
  },

  '& s': {
    fontStyle: 'italic'
  }
});

const appNameStyles = css({
  color: 'primary.darker',
  fontWeight: 'bold'
});

const listStyles = css({
  listStyleType: 'decimal',
  marginBlock: '4',
  paddingInlineStart: '4',

  '& li': {
    marginBlockEnd: '4',
    lineHeight: '1.375em',
    paddingInlineStart: '2'
  }
});

const buttonNameStyles = css({
  border: '2px solid token(colors.primary.darker)',
  borderRadius: '0.25em',
  color: 'primary.darker',
  fontWeight: 'bold',
  marginInline: '0.125em',
  paddingBlock: '0 0.125em',
  paddingInline: '0.375em'
});

function TransferPage() {
  return (
    <article className={articleStyles}>
      <h1>We are moving!</h1>

      <p>
        We&apos;re excited to announce that{' '}
        <span className={appNameStyles}>Limba Vie</span> is moving to its own
        domain at{' '}
        <Link
          aria-label="External link to the new app address"
          href="https://limba.ravenplan.com"
        >
          limba.ravenplan.com <IconExternalLink />
        </Link>
        . As your progress is stored locally on your device, you can easily
        transfer it to the new location.
      </p>
      <p>Below is a quick guide to help you move your progress smoothly.</p>
      <p>
        If you have any questions or need assistance, do not hesitate to contact
        us at{' '}
        <Link
          aria-label="Contact e-mail address"
          href="mailto:limba@ravenplan.com"
        >
          limba@ravenplan.com
        </Link>
        .
      </p>

      <h2>Transferring your progress</h2>
      <ol className={listStyles}>
        <li>
          Head over to{' '}
          <Link
            aria-label="About page of limba.vercel.app"
            href="https://limba.vercel.app/about#progress"
          >
            limba.vercel.app/about
          </Link>{' '}
          page and scroll to <strong>&quot;Progress&quot;</strong> section.
        </li>
        <li>
          Click the button{' '}
          <span className={buttonNameStyles}>Download progress</span> to save a
          JSON file containing all your progress. The filename will be similar
          to{' '}
          <code>
            limba_vie_progress_
            <wbr />
            09.09.2024_8fce7fff.json
          </code>
          .
        </li>
        <li>
          Now, visit the about page of our new address{' '}
          <Link
            aria-label="External link to the new app address"
            href="https://limba.ravenplan.com/about#progress"
          >
            limba.ravenplan.com/about <IconExternalLink />
          </Link>
          . There you will find the same <strong>&quot;Progress&quot;</strong>{' '}
          section.
        </li>
        <li>
          Click the button{' '}
          <span className={buttonNameStyles}>Upload progress</span>. This will
          open a window where you need to select the JSON file that you
          downloaded in <strong>step 2</strong>.
        </li>
        <li>
          That&apos;s it! You will see a confirmation message once your progress
          has been successfully uploaded. Now you can use{' '}
          <span className={appNameStyles}>Limba Vie</span> on its new domain and
          forget about the old link (<s>limba.vercel.app</s>).
        </li>
      </ol>

      <p>
        Once again, if you encounter any issues during the transfer process, you
        can contact us at{' '}
        <Link
          aria-label="Contact e-mail address"
          href="mailto:limba@ravenplan.com"
        >
          limba@ravenplan.com
        </Link>
        .
      </p>
      <p>
        <i>P.S.</i> For the best possible experience, we recommend installing
        the <span className={appNameStyles}>Limba Vie</span>, if your browser
        suggests so. It&apos;s lightweight and offers several benefits, such as
        improved performance and offline functionality.
      </p>
    </article>
  );
}

export default TransferPage;
