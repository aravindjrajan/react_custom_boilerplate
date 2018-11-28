import React from 'react';
import logo from './react.svg';
import './Home.css';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

class Home extends React.Component {
  formikForm;
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <Formik {...this.getFormikProps()}>
          {props => this.renderInnerForm(props)}
        </Formik>
      </div>
    );
  }

  getFormikProps() {
    return {
      initialValues: { username: '', password: '' },
      validationSchema: yup.object().shape(this.getValidationSchema()),
      onSubmit: this.onSubmit,
      ref: this.setFormikRef
    };
  }

  setFormikRef = (ref: Formik) => {
    this.formikForm = ref;
  };

  onSubmit = (values) => {
    this.formikForm.setTouched({
      name: true,
      description: true,
      interests: true,
      public: true,
    });
    console.log(values);
  }

  getValidationSchema() {
    let schema: any = {
      username: yup.string().required('This field is required'),
      password: yup.string().required('This field is required'),
    };
    return schema;
  }

  renderInnerForm (props) {
    const { touched, errors, handleSubmit } = props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field type="text" name="username" id="username" placeholder="Username"/>
        {touched.username && errors.username && <p className="validation-error">{errors.username}</p>}
        <br/>
        <Field type="password" name="password" id="password" placeholder="Password"/>
        {touched.password && errors.password && <p className="validation-error">{errors.password}</p>}
        <br/>
        <Field type="submit" value="Login"/>
      </Form>
      )
  }
}

export default Home;
