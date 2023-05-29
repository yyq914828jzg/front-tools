import shiroTrie from 'shiro-trie';

function _parsePermission(permission) {
  const parts = permission.split(':');
  let main = permission;
  let params;
  if (parts.length > 0 && parts[parts.length - 1].includes('=')) {
    params = parts[parts.length - 1];
    main = parts.slice(0, -1).join(':');
  }
  return { main, params };
}

function _checkParameters(requiredPermission, userPermission) {
  if (userPermission.params && userPermission.params !== requiredPermission.params) {
    return false;
  }
  return true;
}

function hasPermission(requiredPermission, userPermissions) {
  if (!userPermissions) {
    return false;
  }
  if (!requiredPermission) {
    return true;
  }
  const _parsedRequired = _parsePermission(requiredPermission);
  const trie = shiroTrie.newTrie();
  userPermissions.forEach(function (permission) {
    const userPerm = _parsePermission(permission);
    if (_checkParameters(_parsedRequired, userPerm)) {
      trie.add(userPerm.main);
    }
  });
  return trie.check(requiredPermission);
}

function canView(preferredPermission, userPermissions) {
  if (userPermissions && userPermissions instanceof Array && userPermissions.length > 0) {
    const trimmeds = userPermissions.map(function (permission) {
      return _parsePermission(permission).main;
    });
    const trie = shiroTrie.newTrie();
    trie.add(trimmeds);
    return trie.permissions(`${preferredPermission}:?`).length > 0;
  }
  return false;
}

// Test cases:

const trimmed = _parsePermission('order:read:account=3939').main;
console.info(`trimmed permission: ${trimmed}`);
console.log(hasPermission('hello:world', ['*']));
console.log(_parsePermission('*'));

export default {
  canView,
  hasPermission,
};
