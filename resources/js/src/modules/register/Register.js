import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {loginUser} from '../../store/reducers/auth';

import {Button} from '../../components';
import * as AuthService from '../../services/auth';

const Register = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const[designations,setDesignation]= useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('/api/designation').then(response => {
            setDesignation(response.data)
        })
    },[])
    const register = async (email, password) => {
        try {
            toast.success('Registration is success');
            history.push('/');
        } catch (error) {
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed'
            );
            setAuthLoading(false);
        }
    };

    const printFormError = (formik, key) => {
        if (formik.touched[key] && formik.errors[key]) {
            return <div>{formik.errors[key]}</div>;
        }
        return null;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            file: '',
            designation_id: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            
            
        }),
        onSubmit: (values) => {
            let data = new FormData();
            Object.keys(values).forEach((key, index) => {
            data.append(key, values[key]);
            });
            axios.post('/api/employee', data,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }).then(response => {
                alert("Created Successfully");
                history.push('/');
             })
        }
    });

    document.getElementById('root').classList = 'hold-transition register-page';

    return (
        <div className="register-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Admin</b>
                        <span>LTE</span>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Add employee</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    {...formik.getFieldProps('name')}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                />
                                </div>
                            </div>
                        
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Select File"
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                      }}
                                />
                            </div>
                            
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                                <select name="designation_id" class="custom-select form-control-border" id="exampleSelectBorder"
                                 {...formik.getFieldProps('designation_id')}>
                                <option value="" selected disabled>Select</option>                        
                        {designations.map(designation => (<option value={designation.id}>{designation.name}</option>))}
                    
                  </select>
                            </div>

                           
                        </div>
                        <button type="submit" disabled={formik.isSubmitting}>
                        Submit
                    </button>
                                         </form>
                                        
                </div>
            </div>
        </div>
    );
};

export default Register;
