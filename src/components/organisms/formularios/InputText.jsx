import styled from "styled-components";

export function InputText({ children, icono, stilos=false }) {
    return (
        <Container
          $stilos={stilos}
        >
            <span className="icono">
              {icono}
            </span>

            <div className="form__group field">
                {children}
            </div>
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    color: #f46943;
  }
  
  .icono {
    font-size: 21px;
    color: ${(props) => props.theme.text};
  }
  
  .form__group {
    position: relative;
    padding: ${(props)=>props.$stilos?"6px 0 0":"20px 0 0"};
    width: 100%;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${(props)=>props.theme.text};
    transition: background-color 5000s ease-in-out 0s;
  }
    
  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 16px;
    color: ${(props)=>props.theme.text};
    padding: 6px 0;
    background: transparent;
    transition: border-color 0.2s;
    &.disabled{
      color: #696969;
      background: #2d2d2d;
      border-radius:8px;
      margin-top:8px;
      border-bottom: 1px dashed #656565;
    }
  }

  .form__fielda {
    font-family: inherit;
    width: 100%;
    min-height: 80px;
    resize: vertical; /* permite agrandar manualmente */
    border: 2px solid #9b9b9b;
    border-radius: 6px;
    outline: 0;
    font-size: 16px;
    color: ${(props) => props.theme.text};
    padding: 10px;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__labela {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  }

  .form__field::placeholder {
    /* color: transparent; */
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 1px;
    border-image: linear-gradient(to right, #ec580e, #f23505);
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #f9632c;
    font-weight: 600;
  }

  .form__fielda:focus {
    padding-bottom: 6px;
    font-weight: 500;
    border-width: 2px;
    border: 2px solid #ec580e;
    border-radius: 6px;
    /* border-image: linear-gradient(to right, #ec580e, #f23505); */
    border-image-slice: 1;
  }

  .form__fielda:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #f9632c;
    font-weight: 700;
  }

  /* reset input */
  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }

  /* reset input */
  .form__fielda:required,
  .form__fielda:invalid {
    box-shadow: none;
  }
 
`;