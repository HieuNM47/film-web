import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../api/user';
import { convertString, patternNormal, patternWebsite } from '../../utils';
import { changePass, getDataUser, logOut } from '../../api/auth';

const useStyles = makeStyles((theme) => ({
     label: {
          color: theme.color.text,
          fontWeight: 600,
          lineHeight: '22px',
     },
     textBox: {
          color: ' #A9A8AA',
          width: '100%',
          '& input': {
               margin: '8px 0',
               border: '1px solid #A9A8AA',
               padding: '8px 16px 8px 8px !important',
               borderRadius: '6px',
               '&:focus': {
                    borderColor: 'rgb(59, 73, 223)',
                    boxShadow: '0 0 0 1px rgb(59, 73, 223)'
               }
          },
          '& fieldset': {
               border: 'none'
          }
     },
}));

function Setting() {
     const classes = useStyles();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const currentUser = useSelector((state) => state.user?.currentUser);
     const token = useSelector((state) => state.auth?.login?.token);
     const [email, setEmail] = useState(currentUser?.email);
     const [username, setUsername] = useState(currentUser?.name ? currentUser.name : '');
     const [skill, setSkill] = useState(currentUser?.skills ? currentUser.skills : '');
     const [donate, setDonate] = useState(currentUser?.identity_card ? currentUser.identity_card : '');
     const [location, setLocation] = useState(currentUser?.location ? currentUser.location : '');
     const [website, setWebsite] = useState(currentUser?.url ? currentUser.url : '');
     const [bio, setBio] = useState(currentUser?.bio ? currentUser.bio : '');
     const [education, setEducation] = useState(currentUser?.education ? currentUser.education : '');
     const [work, setWork] = useState(currentUser?.work ? currentUser.work : '');
     const [birthday, setBirthDay] = useState(currentUser?.birthday ? currentUser.birthday : '');
     const [avatar, setAvatar] = useState(null);
     const [currentPassword, setCurrentPassword] = useState('');
     const [avtUpload, setAvtUpload] = useState();
     const [newPassword, setNewPassword] = useState('');
     const [reEnterPassword, setReEnterPassword] = useState('');
     const [validateAvt, setValidateAvt] = useState('');
     const [validateUserName, setValidateUserName] = useState('');
     const [validateDonate, setValidateDonate] = useState('');
     const [validateWebsite, setValidateWebsite] = useState('');
     const [validatePassword, setValidatePassword] = useState('');
     const [validateNewPassword, setValidateNewPassword] = useState('');

     const onChangeImg = async (e) => {
          const reader = new FileReader();

          reader.onload = () => {
               if (reader.readyState === 2) {
                    setAvatar(reader.result)
               }
          }
          if (e.target.files[0] > 1024 * 1024) {
               setValidateAvt('Vui l??ng kh??ng upload ???nh qu?? 1MB')
          } else {
               setAvtUpload(e.target.files[0])
          }
          reader.readAsDataURL(e.target.files[0]);
     };

     const checkFormValid = () => {
          if (
               validateUserName !== '' ||
               validateDonate !== '' ||
               validateWebsite !== '' ||
               validateAvt !== ''
          ) {
               return false;
          } else {
               return true;
          }
     };

     const handleChangeUserProfile = (e) => {
          e.preventDefault();

          //--------- VALIDATE --------------------//
          if (username.trim() === '') {
               setValidateUserName('Vui l??ng kh??ng b??? tr???ng t??n');
          } else if (!patternNormal.test(convertString(username))) {
               setValidateUserName('T??n ch??? cho ph??p c??c k?? t??? t??? a-z, A-Z, 0-9');
          } else setValidateUserName('');
          if (patternWebsite.exec(website) === null) {
               setValidateWebsite('?????a ch??? url kh??ng h???p l???');
          } else setValidateWebsite('');
          if (donate.length < 9) {
               setValidateDonate('Vui l??ng nh???p l???n h??n ho???c b???ng 9 k?? t???')
          } else setValidateDonate('')
          //--------- VALIDATE --------------------//

          const userChange = {
               name: username,
               id_permission: currentUser.id_permission,
               identity_card: donate,
               birthday: birthday,
               url: website,
               location: location,
               bio: bio,
               currently_learning: currentUser.currently_learning,
               skills: skill,
               work: work,
               education: education,
               avatar: avtUpload,
               _method: 'PUT'
          };
          if (checkFormValid()) {
               editUser(userChange, currentUser.id)
                    .then((res) => {
                         console.log(res);
                    })
                    .catch((error) => {
                         console.log(error.message);
                    });
               getDataUser(token, dispatch)
          } else {
               alert("Kiem tra lai form")
          }
     }

     const checkFormPasswordValid = () => {
          if (
               validatePassword !== '' ||
               validateNewPassword !== ''
          ) {
               return false;
          } else {
               return true;
          }
     };

     const handleChangePass = (e) => {
          e.preventDefault();

          //--------- VALIDATE --------------------//
          if (currentPassword.trim() === '') {
               setValidatePassword('Vui l??ng kh??ng b??? tr???ng m???t kh???u hi???n t???i');
          } else if (currentPassword === newPassword) {
               setValidatePassword('M???t kh???u m???i v?? m???t kh???u hi???n t???i kh??ng ???????c tr??ng nhau');
          } else setValidatePassword('');
          if (newPassword !== reEnterPassword) {
               setValidateNewPassword('Nh???p l???i m???t kh???u kh??ng kh???p')
          } else setValidateNewPassword('')
          //--------- VALIDATE --------------------//

          const passwordChange = {
               password: currentPassword,
               password_new: newPassword,
               email: email
          };

          if (checkFormPasswordValid()) {
               changePass(passwordChange)
                    .then((res) => {
                         console.log(res.data);
                         if (res.data.data === 1) {
                              logOut(dispatch, currentUser.id, navigate, token);
                         }
                    })
                    .catch((error) => {
                         console.log(error.message);
                    });
          } else {
               alert("Kiem tra lai form")
          }
     }

     return (
          <div style={{ margin: "72px auto", width: '1200px' }}>
               <h1>C??i ?????t T??i Kho???n</h1>
               <Grid>
                    <Paper elevation={10} style={{ padding: 20, marginBottom: '1rem' }}>
                         <form onSubmit={handleChangeUserProfile}>
                              <div style={{ width: "100%" }}>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Email'}
                                   </Typography>
                                   <TextField
                                        type='email'
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        helperText={''}
                                        error
                                        disabled
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'T??n Ng?????i D??ng'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateUserName}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'K??? N??ng'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setSkill(e.target.value)}
                                        value={skill}
                                        helperText={''}
                                        error
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'ID ???ng H??? Qua PayPal'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setDonate(e.target.value)}
                                        value={donate}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateDonate}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'?????a ??i???m'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                        helperText={''}
                                        error
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'???nh ?????i Di???n'}
                                   </Typography>
                                   <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                             alt={`avatar ${username}`}
                                             src={avatar}
                                             sx={{
                                                  width: "4rem",
                                                  height: "4rem",
                                             }}
                                        />
                                        <input
                                             style={{ display: 'none', }}
                                             type='file'
                                             accept='image/*'
                                             name='image-upload'
                                             id='input'
                                             onChange={onChangeImg}
                                        />
                                        <label htmlFor="input" className='image-upload'>
                                             C???p Nh???t ???nh ?????i Di???n
                                        </label>
                                   </div>
                                   <div style={{ color: 'red' }}>
                                        {validateAvt}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Website'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setWebsite(e.target.value)}
                                        value={website}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateWebsite}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Ti???u S???'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setBio(e.target.value)}
                                        value={bio}
                                        helperText={''}
                                        error
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'H???c V???n'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setEducation(e.target.value)}
                                        value={education}
                                        helperText={''}
                                        error
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'N??i l??m vi???c'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setWork(e.target.value)}
                                        value={work}
                                        helperText={''}
                                        error
                                   />
                              </div>
                              <Button color='primary' variant="contained" type='submit' style={{ margin: '8px 0', padding: '0.75rem 1.25rem', width: '100%' }}>L??u Thay ?????i</Button>
                         </form>
                    </Paper>

                    <Paper elevation={10} style={{ padding: 20, marginBottom: '1rem' }}>
                         <form onSubmit={handleChangePass}>
                              <Typography variant='h4' style={{ fontWeight: 600, marginBottom: '1rem' }}>
                                   {'?????i M???t Kh???u'}
                              </Typography>
                              <div style={{ width: "100%" }}>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'M???t Kh???u Hi???n T???i'}
                                   </Typography>
                                   <TextField
                                        type='password'
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        value={currentPassword}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validatePassword}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'M???t Kh???u M???i'}
                                   </Typography>
                                   <TextField
                                        type='password'
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        helperText={''}
                                        error
                                   />
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Nh???p L???i M???t Kh???u M???i'}
                                   </Typography>
                                   <TextField
                                        type='password'
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setReEnterPassword(e.target.value)}
                                        value={reEnterPassword}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateNewPassword}
                                   </div>
                              </div>
                              <Button color='primary' variant="contained" type='submit' style={{ margin: '8px 0', padding: '0.75rem 1.25rem', width: '100%' }}>L??u Thay ?????i</Button>
                         </form>

                    </Paper>
               </Grid>
          </div>
     );
}

export default Setting;