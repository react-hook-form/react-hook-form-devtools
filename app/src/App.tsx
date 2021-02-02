import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';

const App = () => {
  const { register, control, handleSubmit, formState } = useForm<{
    test: string;
    test1: string;
    custom: string;
  }>({
    mode: 'onChange',
  });

  React.useEffect(() => {
    register('custom');
  }, [register]);

  console.log('app', formState.touched);
  console.log('app', formState.dirtyFields);
  console.log('app', formState.isValid);

  return (
    <div className="App">
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>
          <span role="img" aria-label="devTool">
            🔧
          </span>{' '}
          DevTools
        </h1>
        <p style={{ textAlign: 'center' }}>
          React Hook Form DevTools to help debug forms.
        </p>
        <label>First Name</label>
        <input
          name="thisNameHasBeenMadeLongForThePurposesOfDemonstration"
          ref={register({ required: true })}
        />

        <label>Last Name</label>
        <input name="lastName" ref={register({ required: true })} />

        <input style={{ fontWeight: 400 }} type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default App;
