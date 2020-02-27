import styled from 'styles/styled-components';

// language=SCSS prefix=&{ suffix=}
const Wrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3000;
    background: rgba(24, 48, 84, 1) linear-gradient(-45deg, rgba(11, 21, 37, 1) 0%, rgba(24, 48, 84, 1) 100%);
    user-select: none;

    > img {
      width: 48px;
      -webkit-user-drag: none;
      display: block;
    }

    div.content {
      margin-top: 1em;
      color: white;
    }
`;

export default Wrapper;
