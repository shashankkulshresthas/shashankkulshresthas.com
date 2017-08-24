CKEDITOR.plugins.add('tokens',
{
    requires: ['richcombo'], //, 'styles' ],
    init: function (editor) {
        var config = editor.config,
           lang = editor.lang.format;

        // Gets the list of tags from the settings.
        var tags = []; //new Array();
        //this.add('value', 'drop_text', 'drop_label');
        
        tags[0] = ["@UserID", "User ID", "UserID"];
        tags[1] = ["@UserTypeId", "User Type Id", "UserTypeId"];
        tags[2] = ["@FirstName", "First Name", "FirstName"];
        tags[3] = ["@MiddleName", "Middle Name", "MiddleName"];
        tags[4] = ["@LastName", "Last Name", "LastName"];
        tags[5] = ["@PrimaryPhone", "Primary Phone", "PrimaryPhone"];
        tags[6] = ["@Email", "Email", "Email"];
        tags[7] = ["@SSN", "SSN", "SSN"];
        tags[8] = ["@LoginName", "Login Name", "LoginName"];
        tags[9] = ["@LoginPassword", "Login Password", "LoginPassword"];
        tags[10] = ["@UnlockCode", "Unlock Code", "UnlockCode"];
        tags[11] = ["@CourseName", "Course Name", "CourseName"];
        tags[12] = ["@ResetRequestCode", "Reset Request Code", "ResetRequestCode"];
        tags[13] = ["@Subtotal", "Sub Total", "Subtotal"];
        tags[14] = ["@CouponCode", "Coupon Code", "CouponCode"];
        tags[15] = ["@CupCodeAmount", "Coupon Code Amount", "CupCodeAmount"];
        tags[16] = ["@OrderTotal", "Order Total", "OrderTotal"];
        tags[17] = ["@PurchaseOrderId", "Purchase OrderId", "PurchaseOrderId"];
        tags[18] = ["@Quantity", "Quantity", "Quantity"];
        tags[19] = ["@Term", "Term", "Term"];
        tags[20] = ["@CoursePrice", "Course Price", "CoursePrice"];
        tags[21] = ["@CourseImagePath", "Course Image Path", "CourseImagePath"];
        tags[22] = ["@Coptr", "Coptr", "Coptr"];
        tags[23] = ["@ListOfCourses", "List Of Courses", "ListOfCourses"];







        // Create style objects for all defined styles.

        editor.ui.addRichCombo('tokens',
           {
               label: "Select Tokens",
               title: "Select Tokens",
               voiceLabel: "Select Tokens",
               className: 'cke_format',
               multiSelect: false,

               panel:
               {
                   css: [config.contentsCss, CKEDITOR.getUrl(editor.skinPath + 'editor.css')],
                   voiceLabel: lang.panelVoiceLabel
               },

               init: function () {
                   this.startGroup("");
                   //this.add('value', 'drop_text', 'drop_label');
                   for (var this_tag in tags) {
                       this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
                   }
               },

               onClick: function (value) {
                   editor.focus();
                   editor.fire('saveSnapshot');
                   editor.insertHtml(value);
                   editor.fire('saveSnapshot');
               }
           });
    }
});