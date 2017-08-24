angular.module('Sort').directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}).directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
}).controller('TemplateMasterCntrl', function ($scope, ssSideNav, ssSideNavSharedService, APICallService, $mdToast) {
   

    $scope.GetAllTemplates = function () {
        APICallService.Post('TemplateMaster', 'GetAllTemplates').then(function (e) {
            $scope.TemplateMasterList = e.data;         
           
        });
    }


    $scope.DisplayTemplate = function (TemplateId) {       
        var obj = { "TemplateId": TemplateId };
        APICallService.Post('TemplateMaster', 'GetTemplateById', obj).then(function (e) {
            
            $scope.EditorContent = '';
            $scope.TemplateName = '';
            $scope.ButtenText = 'Update';
            $scope.TemplateId = e.data[0].TemplateId;
            $scope.TemplateName = e.data[0].TemplateName;
            $scope.EditorContent = e.data[0].Templates;
            
        });
    }

    $scope.CancelDisplayTemplate = function () {
        $scope.EditorContent = '';
        $scope.TemplateName = '';
        $scope.TemplateId = '';
        $scope.ButtenText = 'Submit';
       
    }


    $scope.UpdateTemplate = function () {
        var obj = {
            "TemplateId": $scope.TemplateId,
            "TemplateName": $scope.TemplateName,
            "Templates": $scope.EditorContent
        };
        APICallService.Post('TemplateMaster', 'UpdateTemplate', obj).then(function (e) {


            debugger;
            if (e.status = 200) {
                var toast = $mdToast.simple().content("Your data has been Updated successfully.").position('right bottom').action('OK').highlightAction(false).hideDelay(30000);
                $mdToast.show(toast);

                $scope.EditorContent = '';
                $scope.TemplateName = '';
                $scope.TemplateId = '';
                
            }

            
        });
    }


    $scope.AddNewTemplate = function (TemplateId) {
        $scope.EditorContent = '';
        $scope.TemplateName = '';
        $scope.ButtenText = 'Submit';
        $scope.TemplateId = '';
        
        
    }

    

    

})