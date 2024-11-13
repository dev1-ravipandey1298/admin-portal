import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_PORTAL_API_BASE_URL, 
  // baseURL: "http://localhost:8080/dp-internal/notification-admin",
  // baseURL: "https://dpuat.wealthapp.hdfcbankuat.com/dp-internal/notification-admin",
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
  },
});

const apiClientWithoutAuthToken = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_PORTAL_API_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


const apiClientWithMultipartContent = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_PORTAL_API_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    'Content-Type': 'multipart/form-data',
  },
});

const TOKEN_NAME = 'X-Auth-Token'


export const fetchTemplates = () => {
  return apiClient.get('/v1/templates', {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });  
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/v1/templates/draft/${templateId}`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getNotificationTemplateById = (templateId) => {
  return apiClient.get(`/v1/templates/${templateId}`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

export const getAllTemplates = () => {
  return apiClient.get(`/v1/templates/draft`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const createTemplate = (formData) => {
  return apiClientWithMultipartContent.post(`/v1/templates/draft`, formData, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const updateTemplate = (templateId, formData) => {
  return apiClientWithMultipartContent.put(`/v1/templates/draft/${templateId}`, formData, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/v1/templates/draft/${templateId}`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const deleteNonApprovedTemplate = (templateId) => {
  return apiClient.delete(`/v1/templates/${templateId}`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const submitForCUG_Approval_Template = (formData) => {
  return apiClientWithMultipartContent.put(`/v1/templates/template/cug-approval`, formData, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getTemplatesBySearchCriteria = (data) => {
  return apiClient.post(`/v1/templates`, data, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markCUGReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-reject`, comment, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markCUGApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-approved`, comment, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const submitForPRODApproval = (templateId, formData) => {
  return apiClientWithMultipartContent.patch(`/v1/templates/${templateId}/final-approval`, formData, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markCUGFailed = (templateId, formData) => {
  return apiClientWithMultipartContent.patch(`/v1/templates/${templateId}/cug-failed`, formData, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markPRODReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-reject`, comment, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markPRODApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approved`, comment, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markPRODEnable = (templateId) => {
  return apiClient.patch(`/v1/templates/${templateId}/enable`, null, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markPRODDisable = (templateId) => {
  return apiClient.patch(`/v1/templates/${templateId}/disable`, null, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getAllCUGUsers = () => {
  return apiClient.get(`/v1/cug/users`, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const deleteSelectedCUGUsers = (selectedUsers) => {
  return apiClient.delete(`/v1/cug/users`, {
    data: selectedUsers, 
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const createNewCugUser = (user) => {
  return apiClient.post(`/v1/cug/users`, user, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};



// LOGIN API's

export const userLogin = (data) => {
  return apiClientWithoutAuthToken.post(`/v1/user/login`, data);
};

export const userLogout = () => {
  return apiClient.post(`/v1/user/logout`,null, {
    headers: {
      'X-Auth-Token' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};
