
const Footer = () => {
  return (
    <p className='clearfix text-center mb-0'>
      COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='#' target='_blank' rel='noopener noreferrer'>
          TMS
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
    </p>
  )
}

export default Footer
