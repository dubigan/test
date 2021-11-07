import styled from 'styled-components';

export const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;
`;

// export const ModalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   background-color: #f2f2f2;
//   width: 335px;
//   height: 410px;
//   padding: 20px;
//   border: 1px solid rgba(255, 255, 255, 0.5);
// `;

export const ModalContainer = styled.div<{ zIndex: string }>`
  position: fixed;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  transition: 0.3s;
  z-index: ${(props) => props.zIndex};
  overflow: auto;
`;

export const ModalComponentInner = styled.div<{ nBr?: boolean }>`
  margin: 0 20px;
  border-radius: ${(props) => (props.nBr ? '0' : '8px')};
  border: 1px solid #e5e7eb;
  // box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.7), 3px 0px 3px rgba(0, 0, 0, 0.7);
  box-shadow: 7px 7px 3px rgba(0, 0, 0, 0.7);
  position: relative;
  background-color: #f2f2f2;
`;

export const ModalComponent = styled.div<{ width?: string; mobMarg?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  cursor: auto;
  width: ${(props) => (props.width ? props.width : '0')};
  // transition: transform 3s ease-out;
  //transform: translate(0, 4rem);
  // animation: 0.3s ease opacity; //, 0.3s ease transition;
  top: 4rem;
  animation: 0.3s ease transition;
  position: relative;
  span {
    position: absolute;
    right: 20px;
    top: 6%;
    cursor: pointer;
    z-index: 9999;
    font-size: 18px;
  }
  @media (max-width: 768px) {
    margin: ${(props) => (props.mobMarg ? '50px 20px' : '50px auto')};
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes transition {
    from {
      top: 0;
    }
    to {
      top: 4rem;
    }
  }
`;

export const ModalHeader = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 24.5px;
  // margin-bottom: 16px;
  text-align: center;
  padding: 1rem 0;
`;

export const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 24.5px;
  // margin-bottom: 16px;
  text-align: center;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  frex-wrap: nowrap;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  // margin-bottom: 16px;
  // text-align: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ModalFooter = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 24.5px;
  // margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
`;
