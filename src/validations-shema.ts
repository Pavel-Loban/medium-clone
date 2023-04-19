import * as Yup from 'yup';

export const SchemaFormStep1 = Yup.object().shape({
    username: Yup.string().required('cannot be empty')
        .matches(
            (/^[a-z0-9]+$/i),
            'Поле не может быть пустым',)
            .matches((/[a-zA-Z]/), '')

            ,
    password: Yup.string()
        .required('Поле не может быть пустым')
        .min(8, 'Пароль должен быть более 8 символов')
        .max(16)
        .matches(
            /(?=.*[A-Z])\w+/,
            'Пароль должен содержать как минимум одну прописную',
        )
        .matches(/\d/, 'Пароль должен содержать как минимум одну цифру'),
});



export const SchemaStep2 = Yup.object().shape({
    firstName: Yup.string().required('Поле не может быть пустым')
        .matches(/^\S*$/, 'Не заполнено')
        .max(16),
    lastName: Yup.string()
        .required('Поле не может быть пустым')
        .matches(/^\S*$/, 'Не заполнено')
        .max(25),

});

export const SchemaLastStep = Yup.object().shape({
    phone: Yup.string().required('Поле не может быть пустым')
     .matches(/(?:\+375)\s?\(?29|25|33|44\)?\s?\d\d(?:\d[-\s]\d\d[-\s]\d\d|[-\s]\d\d[-\s]\d\d\d|\d{5})/, 'В формате +375 (xx) xxx-xx-xx')
     .matches(/^([^\\s*]+)/g,'poiuyt')
     .matches(/(.*\d.*){12}/, 'В формате +375 (xx) xxx-xx-xx')
     ,
     email: Yup.string().required('Поле не может быть пустым')
     .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Введите корректный e-mail'),
 });


 export const SchemaSignIn = Yup.object().shape({
    identifier: Yup.string().required('Поле не может быть пустым')
    ,
    password: Yup.string()
        .required('Поле не может быть пустым')

});




export const SchemaAuth = Yup.object().shape({
    email: Yup.string().required('cannot be empty')
     .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Please enter a valid e-mail'),
    password: Yup.string()
        .required('cannot be empty')
        .min(8, 'Password must be more than 8 characters')
});


export const SchemaRegistr = Yup.object().shape({
    userName: Yup.string().required('cannot be empty')
            .matches((/[a-zA-Z]/), 'must contain a capital letter of the Latin alphabet'),
    email: Yup.string().required('cannot be empty')
     .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Please enter a valid e-mail'),
    password: Yup.string()
        .required('cannot be empty')
        .min(8, 'Password must be more than 8 characters')
});

export const SchemaUpdate = Yup.object().shape({
    image: Yup.string().required('cannot be empty')

});


export const SchemaNewArticle = Yup.object().shape({
    title: Yup.string().required('cannot be empty'),
    description: Yup.string().required('cannot be empty'),
    body: Yup.string().required('cannot be empty'),

});