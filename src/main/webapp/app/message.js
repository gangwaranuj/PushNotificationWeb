(function () {
    angular.module('app').factory('message', ['$cookies', '$q', function ($cookies, $q) {

        var message = {};

        message.error = {
            internalError: 'Internal Server Error.'
        }
        //Module: Create Campaign
        message.createCampaign = {
            campaignNameRequire: 'Please enter campaign name.',
            campaignNameLength: 'Campaign name should be less or equal to 50 character.',
            campaignNameFormant: 'Campaign name should be alpha numeric.',
            imageSize: 'Image size should be less or equal to 500 KB.',
            startDateRequire: 'Please select campaign start date.',
            startDateGreatherThanCurrentDate: 'Please choose date in the future.',
            imageRequire: 'Please select an image.',
            headlineRequire: 'Please enter title.',
            headlineLength: 'Title should be less or equal to 48 characters.',
            DescriptionRequire: 'Please enter text.',
            DescriptionLengh: 'Text should be less or equal to 100 characters.',
            urlRequire: 'Please enter URL.',
            urlLenght: 'URL should be less or equal to 100 characters.',
            urlFormat: 'Please enter valid URL. (http:// or https:// is required.)',
            campignEndDate: 'Please choose date in the future.',
            endDateLessThanStartDate: 'Campaign end date should not be less than start date.',
            segmentParamNotExist: 'Please select at least one segment.',
            selectSegment: 'Please select at least one segment.',
            startEndDateDiff: 'Start and end date should differ at least 15 minutes.',
            calMatchingUsers: 'Please calculate matching users.',
            campaignNameExists: 'Campaign {0} already exists.',
            campaignSavedMessage: 'Campaign has been saved successfully.',
            campaignExpireMessage: 'This campaign can not be launched because the start date is in the past. This campaign is now expired.',
            campaignLaunchedMessage: 'Notification sent successfully.',
            campaignLaunchedFailureMessage: 'There was an unexpected error. Please try again later.',
            updateDraftCampaignFailure: 'There was an unexpected error. Please try again later.',
            draftCampaignFailure: 'There was an unexpected error. Please try again later.',
            updatePendingCampaignFailure: 'There was an unexpected error. Please try again later.',
            pendingCampaignFailure: 'There was an unexpected error. Please try again later.'

        };

        //Module: Manage Campaign
        message.mangeCampaign = {
            notification: 'Notification will be sent on ',
            Expired: 'This campaign can not be launched because the start date is in the past. This campaign is now expired.',
            draftCampaignLaunching: 'Please complete the campaign for launching.',
            campaignSavedMessage: 'Campaign has been saved successfully.',
            campaignExpireMessage: 'This campaign can not be launched because the start date is in the past. This campaign is now expired.',
            campaignExpireFailureMessage: 'There was an unexpected error. Please try again later.',
            campaignLaunchedMessage: 'Notification sent successfully.',
            campaignLaunchedFailureMessage: 'There was an unexpected error. Please try again later.',
            deleteCampaign: 'Campaign deleted.',
            deleteCampaignConfirmation: 'Delete campaign?',
            deleteCampaignFailure: 'There was an unexpected error. Please try again later.'
        };

        //Module: Create RSS Push
        message.createRSSPush = {
            rssPushNameLength: 'RSS name should be less or equal to 150 characters.',
            rssPushNameRequire: 'Please enter RSS name.',
            rssPushNameFormat: 'RSS name should be alpha numeric.',
            rssNameExist: 'RSS details with the same name already exists.',
            urlRequire: 'RSS URL is missing/invalid.',
            urlFormat: 'Please enter valid URL. (http:// or https:// is required.)',
            urlLength: 'URL should be less or equal to 400 characters.',
            rssSaved: 'RSS details saved successfully.',
            rssFailed: 'RSS details with the same name already exist.',
            rssupdate: 'RSS details updated successfully.',
            rssUpdationFailed: 'There was an unexpected error. Please try again later.',
            rssActivate: 'RSS activated succesfully.',
            imageRequire: 'Please select an image.',

        };

        //Module: Manage RSS Push
        message.mangeRSSPush = {
            notification: 'Notification will be sent on ',
            rssPushDelete: 'RSS details successfully deleted.',
            deleteRssConfirmation: 'Delete RSS Push?',
            rssActivate: 'RSS activated succesfully.',
            rssPaused: 'RSS paused successfully.',
            rssActivationFailure: 'Failed to activate RSS.',
            rssPauseFailure: 'Failed to pause RSS.',
            rssPushDeleteFailure: 'Failed to Delete RSS.'
        };

        //Module: Create Welcome Push

        message.createWelcomePush = {
            welcomeNameRequire: 'Please enter welcome message name.',
            welcomeNameLength: 'Welcome name should be less or equal to 50 character.',
            welcomeNameFormant: 'Welcome name should be alpha numeric.',
            imageSize: 'Image size should be less or equal to 500 KB.',
            startDateRequire: 'Please select welcome start date.',
            endDateRequire: 'Please select welcome end date.',
            startDateGreatherThanCurrentDate: 'Please choose date in the future.',
            imageRequire: 'Please select an image.',
            titleRequire: 'Please enter title.',
            titleLength: 'Title should be less or equal to 48 characters.',
            DescriptionRequire: 'Please enter text.',
            DescriptionLengh: 'Text should be less or equal to 100 characters.',
            urlRequire: 'Please enter URL.',
            urlLenght: 'URL should be less or equal to 100 characters.',
            urlFormat: 'Please enter valid URL. (http:// or https:// is required.)',
            endDateGreatherThanCurrentDate: 'Please choose date in the future.',
            endDateLessThanStartDate: 'Welcome end date should not be less than start date.',
            segmentParamNotExist: 'Please select at least one segment.',
            selectSegment: 'Please select at least one segment.',
            startEndDateDiff: 'Start and end date should differ at least 15 minutes.',
            calMatchingUsers: 'Please calculate matching users.',
            welcomeNameExists: 'Welcome {0} already exists.',
            startDateEndDateShouldNotbeSame: 'Start and end date should be unequal.',
            welcomeSavedMessage: 'Welcome message has been saved successfully.',
            welcomeExpireMessage: 'This welcome message can not be launched because the start date is in the past. This welcome message is now expired.',
            updateDraftWelcomeFailure: 'There was an unexpected error. Please try again later.',
            draftWelcomeFailure: 'There was an unexpected error. Please try again later.',
            updatePendingWelcomeFailure: 'There was an unexpected error. Please try again later.',
            pendingWelcomeFailure: 'There was an unexpected error. Please try again later.'

        };

        message.manageWelcome = {
            activated: "Welcome notification updated.",
            paused: "Welcome notification paused.",
            deleteWelcome: 'Welcome message deleted.',
            draftWelcomeLaunching: "Please complete the welcome message for launching.",
            notification: 'Notification will be sent on ',
            welcomeExpireMessage: 'This welcome message can not be launched because the start date is in the past. This welcome message is now expired.',
            deleteWelcomeConfirmation: 'Delete welcome message?',
            expireWelcomeFailure: 'There was an unexpected error. Please try again later.',
            changeStatusWelcomeFailure: 'There was an unexpected error. Please try again later.',
            deleteWelcomeFailure: 'There was an unexpected error. Please try again later.'
        };
        message.subscriptionLayout = {
            customNotificationTitleRequire: 'Please enter notification title.',
            customNotificationMessageRequire: 'Please enter notification subtitle.',
            imageRequire: 'Please select an image.',
            allowBtnTextRequired: 'Please enter <i>Allow-Button-text.</i>',
            dontAllowBtnTextRequired: "Please enter <i>Don't-Allow-Button-text.</i>",
            delayTimeValidation: "Delay time should not be more than 999 seconds.",
        };

        message.buttonLinkSubscriptionLayout = {
            delayTimeValidation: "Delay time should not be more than 999 seconds.",
            linkBtnTextRequired: 'Please enter link-text.',
            buttonBtnTextRequired: 'Please enter button-text.'

        };
        message.profile = {
            profilePictureUpload: 'Photo saved successfully.',
            profilePictureUploadError: 'Error uploading photo. Please try again.',
            profilePictureRemoved: 'Photo removed succesfully.',
            profilePictureRemovedError: 'Error removing photo. Please try again.',
            selectProfilePicture: 'Please select an image.',
            enterPassword: 'Enter password.',
            passwordFormat: 'Enter password in correct format.',
            passwordMatching: 'Passwords do not match.'
        }
        message.login = {
            invalidCredentials: "Invalid credentials. Please provide valid credentials.",
            checkMail: "Please check your email.",
            forgetPassword: "We couldn't find an account with that email address.",
            invalidEmailFormat:"Please provide a valid email address."
        }
        message.segmentation = {
            segmentationNameRequire: 'Please enter the name of segment.',
            segmentNameExist: 'Segment with this name already exists. Please select another name.',
            segmentTypeExist: "This segment type already exists.",
            otherSegmentTypeName: "Segment type name could not be 'Other'.",
            segmentTypeName: "Please enter the type of segment.",
            updatedSegment: "Segment changed successfully."
        }
        //Module: Dashboard
        message.dashboard = {
            TODO: 'TODO'
        };

        message.paypal={
            fullNameValidation:"*Please enter your full name.",
            businessEmailValidation:"*Please enter your (business) email address.",
            emailFormatValidation:"*Please enter a valid email address.",
            phoneNumberValidation:"*Please enter your phone number.",
            phoneNumberFormatValidation:"*Please enter a valid phone number.",
            websiteUrlValidation:"*Please enter your website URL.",
            companyNameValidation:"*Please enter your company name.",
            monthlyWebsiteVisitorsValidation:"*Please enter your number of website visitors per month.",
            monthlyWebsiteVisitorsFormatValidation:"*Please enter a valid number of website visitors per month.",
            contactSuccessMessage:"Thank you!<br/>Your message has been successfully sent. We will contact you very soon!",
            contactSaveError:"There was an unexpected error. Please try again later.",
            websiteUrlFormatValidation:"*Please enter a valid website URL.",
            msg:"Message should be less or equal to 250 characters."
        }

        return message;
        // return {
        //     request: function (config) {
        //         blockUI.start();
        //         if ($cookies)
        //             return config;
        //     },
        //     'response': function (response) {
        //         blockUI.stop();
        //         if (response.status === 401) {
        //             $location.path('/login');
        //         }
        //         return response;
        //     },
        //     'responseError': function (rejection) {
        //         blockUI.stop();
        //         if (rejection.status === 511) {
        //             $location.path('/login');
        //         }
        //         return $q.reject(rejection);
        //     }
        // };

    }]);
})();